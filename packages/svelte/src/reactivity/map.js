import { make_reactive, NOTIFY_WITH_ALL_REGISTERED_PARAMS } from './utils.js';

export const ReactiveMap = make_reactive(Map, {
	write_properties: ['clear', 'delete', 'set'],
	read_properties: ['get', 'keys', 'has'],
	interceptors: {
		set: (notify_read_properties, value, property, ...params) => {
			if (value.get(params[0]) === params[1]) {
				return false;
			}
			if (!value.has(params[0])) {
				notify_read_properties(['keys']);
			}
			notify_read_properties(['get', 'has'], params[0]);
			return true;
		},
		clear: (notify_read_properties, value, property, ...params) => {
			if (value.size === 0) {
				return false;
			}
			notify_read_properties(['get', 'keys', 'has'], NOTIFY_WITH_ALL_REGISTERED_PARAMS);
			return true;
		},
		delete: (notify_read_properties, value, property, ...params) => {
			if (!value.has(params[0])) {
				return false;
			}
			notify_read_properties(['get', 'has'], params[0]);
			notify_read_properties(['keys']);
			return true;
		}
	}
});
