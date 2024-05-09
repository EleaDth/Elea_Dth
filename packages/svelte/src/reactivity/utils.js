import { DEV } from 'esm-env';
import { source, set } from '../internal/client/reactivity/sources.js';
import { get } from '../internal/client/runtime.js';

/**
 * @template TEntityInstance
 * @template {(keyof TEntityInstance)[]} TWriteProperties
 * @template {(keyof TEntityInstance)[]} TReadProperties
 * @typedef {Partial<Record<TWriteProperties[number], (notify_read_methods: (methods: TReadProperties, ...params: unknown[])=>void ,value: TEntityInstance, property: TWriteProperties[number], ...params: unknown[])=>boolean>>}  Interceptors - return false if you want to prevent reactivity for this call, DO NOT USE INTERCEPTORS FOR READ METHODS
 */

/**
 * @template TEntityInstance
 * @template {(keyof TEntityInstance)[]} TWriteProperties
 * @template {(keyof TEntityInstance)[]} TReadProperties
 * @typedef {object} Options
 * @prop {TWriteProperties} write_properties - an array of property names on `TEntityInstance` that when calling a property on `TEntityInstance`, if the property name exists in this array, then mentioned property causes reactivity.
 * @prop {TReadProperties} read_properties - an array of property names on `TEntityInstance` that `mutation_properties` affects
 * @prop {Interceptors<TEntityInstance, TWriteProperties, TReadProperties>} [interceptors={}] - if the property names in `mutation_properties` shouldn't cause reactivity, such calling `set.add(2)` twice or accessing a property shouldn't be reactive based on some conditions, you can prevent the reactivity by returning `false` from these interceptors
 */

/** @typedef {Map<string | symbol | number, Map<unknown, import("#client").Source<boolean>>>} ReadMethodsSignals */

/**
 * @template {new (...args: any) => any} TEntity - the entity we want to make reactive
 * @template {(keyof InstanceType<TEntity>)[]} TWriteProperties
 * @template {(keyof InstanceType<TEntity>)[]} TReadProperties
 * @param {TEntity} Entity - the class/function we want to make reactive
 * @param {Options<InstanceType<TEntity>, TWriteProperties, TReadProperties>} options - configurations for how reactivity works for this entity
 * @returns {TEntity}
 */
export const make_reactive = (Entity, options) => {
	/**
	 * @template {InstanceType<TEntity>} TEntityInstance
	 * @template {keyof TEntityInstance} TProperty
	 * @param {import('#client').Source<boolean>} version_signal
	 * @param {ReadMethodsSignals} read_methods_signals
	 * @param {TProperty} property
	 * @param {TEntityInstance} entity_instance
	 * @param {unknown[]} params
	 */
	function notify_if_required(
		version_signal,
		read_methods_signals,
		property,
		entity_instance,
		...params
	) {
		/**
		 * @param {TReadProperties} method_names
		 * @param  {unknown[]} params
		 */
		function notify_read_methods(method_names, ...params) {
			method_names.forEach((name) => {
				if (DEV && !options.read_properties.includes(name)) {
					throw new Error(
						`when trying to notify reactions got a read method that wasn't defined in options: ${name.toString()}`
					);
				}
				(params.length == 0 ? [null] : params).forEach((param) => {
					const sig = get_signal_for_function(read_methods_signals, name, param);
					increment_signal(version_signal, sig);
				});
			});
		}

		if (
			options.interceptors?.[property]?.(
				notify_read_methods,
				entity_instance,
				property,
				...params
			) === false
		) {
			return;
		}
		if (options.write_properties.some((v) => v === property)) {
			increment_signal(version_signal);
		} else {
			if (options.read_properties.includes(property)) {
				(params.length == 0 ? [null] : params).forEach((param) => {
					const sig = get_signal_for_function(read_methods_signals, property, param);
					get(sig);
				});
			} else {
				get(version_signal);
			}
		}
	}

	// we return a class so that the caller can call it with new
	// @ts-ignore
	return class {
		/**
		 * @param {ConstructorParameters<TEntity>}  params
		 */
		constructor(...params) {
			/**
			 * each read method can be tracked like has, size, get and etc. these props might depend on a parameter. they have to reactive based on the
			 * parameter they depend on, if it requires a change. for instance if you call `set.has(2)` then call `set.add(5)` the former shouldn't get notified.
			 * so what is do we need to store if this needs to be generic? function name + parameter. unfortunately for each parameter we need a new signal, why?
			 * because arrays don't equal themselves even if they have the same value (referential equality).
			 * fortunately current builtins that we try to make reactive only take 1 parameter for their read methods so this is fine.
			 * @type {Map<string | symbol, Map<unknown[], import("#client").Source<boolean>>>}
			 **/
			const read_methods_signals = new Map();
			/**
			 * other props that get notified based on any change listen to version
			 */
			const version_signal = source(false);
			return new Proxy(new Entity(...params), {
				get(target, property) {
					const orig_property = target[property];
					let result;

					if (typeof orig_property === 'function') {
						// Bind functions directly to the `TEntity`
						result = ((/** @type {unknown[]} */ ...params) => {
							notify_if_required(version_signal, read_methods_signals, property, target, ...params);
							return orig_property.bind(target)(...params);
						}).bind(target);
					} else {
						// Properly handle getters
						notify_if_required(version_signal, read_methods_signals, property, target);
						result = Reflect.get(target, property, target);
					}

					return result;
				}
			});
		}
	};
};

/**
 * gets the signal for this function based on params. If the signal doesn't exist, it creates a new one and returns that
 * @param {ReadMethodsSignals} signals_map
 * @param {string | symbol | number} function_name
 * @param {unknown} param
 */
const get_signal_for_function = (signals_map, function_name, param) => {
	/**
	 * @type {Map<unknown, import("#client").Source<boolean>>}
	 */
	let params_to_signal_map;
	if (!signals_map.has(function_name)) {
		params_to_signal_map = new Map([[param, source(false)]]);
		signals_map.set(function_name, params_to_signal_map);
	} else {
		params_to_signal_map = /**
		 * @type {Map<unknown[], import("#client").Source<boolean>>}
		 */ (signals_map.get(function_name));
	}

	/**
	 * @type {import("#client").Source<boolean>>}
	 */
	let signal;
	if (!params_to_signal_map.has(param)) {
		signal = source(false);
		params_to_signal_map.set(param, signal);
	} else {
		signal = /**
		 * @type {import("#client").Source<boolean>}
		 */ (params_to_signal_map.get(param));
	}

	return signal;
};

/**
 * toggles the signal value. this change notifies any reactions (not using number explicitly cause its not required, change from true to false or vice versa is enough).
 * @param {import("#client").Source<boolean>} version_signal
 * @param {import("#client").Source<boolean>} [function_signal]
 */
const increment_signal = (version_signal, function_signal) => {
	set(version_signal, !version_signal.v);
	function_signal && set(function_signal, !function_signal.v);
};
