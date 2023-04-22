import {
	ARIARoleDefinitionKey,
	roles as roles_map,
	elementRoles,
	ARIARoleRelationConcept
} from 'aria-query';
import { AXObjects, AXObjectRoles, elementAXObjects } from 'axobject-query';
import Attribute from '../nodes/Attribute';
import { regex_whitespaces } from '../../utils/patterns';

const aria_roles = roles_map.keys();
const abstract_roles = new Set(aria_roles.filter(role => roles_map.get(role).abstract));
const non_abstract_roles = aria_roles.filter((name) => !abstract_roles.has(name));

const non_interactive_roles = new Set(
	non_abstract_roles
		.filter((name) => {
			const role = roles_map.get(name);
			return (
				// 'toolbar' does not descend from widget, but it does support
				// aria-activedescendant, thus in practice we treat it as a widget.
				// focusable tabpanel elements are recommended if any panels in a set contain content where the first element in the panel is not focusable.
				!['toolbar', 'tabpanel'].includes(name) &&
				!role.superClass.some((classes) => classes.includes('widget'))
			);
		})
		.concat(
			// The `progressbar` is descended from `widget`, but in practice, its
			// value is always `readonly`, so we treat it as a non-interactive role.
			'progressbar'
		)
);

const interactive_roles = new Set(
	non_abstract_roles.filter((name) => !non_interactive_roles.has(name))
);

export function is_non_interactive_roles(role: ARIARoleDefinitionKey) {
	return non_interactive_roles.has(role);
}

export function is_interactive_roles(role: ARIARoleDefinitionKey) {
	return interactive_roles.has(role);
}

export function is_abstract_role(role: ARIARoleDefinitionKey) {
	return abstract_roles.has(role);
}

const presentation_roles = new Set(['presentation', 'none']);

export function is_presentation_role(role: ARIARoleDefinitionKey) {
	return presentation_roles.has(role);
}

export function is_hidden_from_screen_reader(tag_name: string, attribute_map: Map<string, Attribute>) {
	if (tag_name === 'input') {
		const type = attribute_map.get('type')?.get_static_value();

		if (type && type === 'hidden') {
			return true;
		}
	}

	const aria_hidden = attribute_map.get('aria-hidden');
	if (!aria_hidden) return false;
	if (!aria_hidden.is_static) return true;
	const aria_hidden_value = aria_hidden.get_static_value();
	return aria_hidden_value === true || aria_hidden_value === 'true';
}

export function has_disabled_attribute(attribute_map: Map<string, Attribute>) {
	const disabled_attr = attribute_map.get('disabled');
	const disabled_attr_value = disabled_attr && disabled_attr.get_static_value();
	if (disabled_attr_value) {
		return true;
	}

	const aria_disabled_attr = attribute_map.get('aria-disabled');
	if (aria_disabled_attr) {
		const aria_disabled_attr_value = aria_disabled_attr.get_static_value();
		if (aria_disabled_attr_value === true) {
			return true;
		}
	}

	return false;
}

const non_interactive_element_role_schemas: ARIARoleRelationConcept[] = [];

elementRoles.entries().forEach(([schema, roles]) => {
	if ([...roles].every((role) => role !== 'generic' && non_interactive_roles.has(role))) {
		non_interactive_element_role_schemas.push(schema);
	}
});

const interactive_element_role_schemas: ARIARoleRelationConcept[] = [];

elementRoles.entries().forEach(([schema, roles]) => {
	if ([...roles].every((role) => interactive_roles.has(role))) {
		interactive_element_role_schemas.push(schema);
	}
});

const interactive_ax_objects = new Set(
	[...AXObjects.keys()].filter((name) => AXObjects.get(name).type === 'widget')
);

const non_interactive_ax_objects = new Set(
	[...AXObjects.keys()].filter((name) => ['windows', 'structure'].includes(AXObjects.get(name).type))
);

const interactive_element_ax_object_schemas: ARIARoleRelationConcept[] = [];

elementAXObjects.entries().forEach(([schema, ax_object]) => {
	if ([...ax_object].every((role) => interactive_ax_objects.has(role))) {
		interactive_element_ax_object_schemas.push(schema);
	}
});

const non_interactive_element_ax_object_schemas: ARIARoleRelationConcept[] = [];

elementAXObjects.entries().forEach(([schema, ax_object]) => {
	if ([...ax_object].every((role) => non_interactive_ax_objects.has(role))) {
		non_interactive_element_ax_object_schemas.push(schema);
	}
});

function match_schema(
	schema: ARIARoleRelationConcept,
	tag_name: string,
	attribute_map: Map<string, Attribute>
) {
	if (schema.name !== tag_name) return false;
	if (!schema.attributes) return true;
	return schema.attributes.every((schema_attribute) => {
		const attribute = attribute_map.get(schema_attribute.name);
		if (!attribute) return false;
		if (
			schema_attribute.value &&
			schema_attribute.value !== attribute.get_static_value()
		) {
			return false;
		}
		return true;
	});
}

export enum ElementInteractivity {
	Interactive = 'interactive',
	NonInteractive = 'non-interactive',
	Static = 'static',
}

export function element_interactivity(
	tag_name: string,
	attribute_map: Map<string, Attribute>
): ElementInteractivity {
	if (
		interactive_element_role_schemas.some((schema) =>
			match_schema(schema, tag_name, attribute_map)
		)
	) {
		return ElementInteractivity.Interactive;
	}

	if (
		tag_name !== 'header' && 
		non_interactive_element_role_schemas.some((schema) =>
			match_schema(schema, tag_name, attribute_map)
		)
	) {
		return ElementInteractivity.NonInteractive;
	}

	if (
		interactive_element_ax_object_schemas.some((schema) =>
			match_schema(schema, tag_name, attribute_map)
		)
	) {
		return ElementInteractivity.Interactive;
	}

	if (
		non_interactive_element_ax_object_schemas.some((schema) =>
			match_schema(schema, tag_name, attribute_map)
		)
	) {
		return ElementInteractivity.NonInteractive;
	}

	return ElementInteractivity.Static;
}

export function is_interactive_element(tag_name: string, attribute_map: Map<string, Attribute>): boolean {
	return element_interactivity(tag_name, attribute_map) === ElementInteractivity.Interactive;
}

export function is_non_interactive_element(tag_name: string, attribute_map: Map<string, Attribute>): boolean {
	return element_interactivity(tag_name, attribute_map) === ElementInteractivity.NonInteractive;
}

export function is_static_element(tag_name: string, attribute_map: Map<string, Attribute>): boolean {
	return element_interactivity(tag_name, attribute_map) === ElementInteractivity.Static;
}

export function is_semantic_role_element(role: ARIARoleDefinitionKey, tag_name: string, attribute_map: Map<string, Attribute>) {
	for (const [schema, ax_object] of elementAXObjects.entries()) {
		if (schema.name === tag_name && (!schema.attributes || schema.attributes.every(
			(attr) => attribute_map.has(attr.name) && attribute_map.get(attr.name).get_static_value() === attr.value
		))) {
			for (const name of ax_object) {
				const roles = AXObjectRoles.get(name);
				if (roles) {
					for (const { name } of roles) {
						if (name === role) {
							return true;
						}
					}
				}
			}
		}
	}
	return false;
}

// https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofilling-form-controls:-the-autocomplete-attribute
const address_type_tokens = new Set(['shipping', 'billing']);
const autofill_field_name_tokens = new Set([
	'name',
	'honorific-prefix',
	'given-name',
	'additional-name',
	'family-name',
	'honorific-suffix',
	'nickname',
	'username',
	'new-password',
	'current-password',
	'one-time-code',
	'organization-title',
	'organization',
	'street-address',
	'address-line1',
	'address-line2',
	'address-line3',
	'address-level4',
	'address-level3',
	'address-level2',
	'address-level1',
	'country',
	'country-name',
	'postal-code',
	'cc-name',
	'cc-given-name',
	'cc-additional-name',
	'cc-family-name',
	'cc-number',
	'cc-exp',
	'cc-exp-month',
	'cc-exp-year',
	'cc-csc',
	'cc-type',
	'transaction-currency',
	'transaction-amount',
	'language',
	'bday',
	'bday-day',
	'bday-month',
	'bday-year',
	'sex',
	'url',
	'photo'
]);
const contact_type_tokens = new Set(['home', 'work', 'mobile', 'fax', 'pager']);
const autofill_contact_field_name_tokens = new Set([
	'tel',
	'tel-country-code',
	'tel-national',
	'tel-area-code',
	'tel-local',
	'tel-local-prefix',
	'tel-local-suffix',
	'tel-extension',
	'email',
	'impp'
]);

export function is_valid_autocomplete(type: null | true | string, autocomplete: null | true | string) {
	if (typeof autocomplete !== 'string' || typeof type !== 'string') {
		return false;
	}

	const tokens = autocomplete.trim().toLowerCase().split(regex_whitespaces);
	const normalized_type = type.toLowerCase();

	const input_wears_autofill_anchor_mantle = normalized_type === 'hidden';
	const input_wears_autofill_expectation_mantle = !input_wears_autofill_anchor_mantle;

	if (input_wears_autofill_expectation_mantle) {
		if (tokens[0] === 'on' || tokens[0] === 'off') {
			return tokens.length === 1;
		}
	}

	if (typeof tokens[0] === 'string' && tokens[0].startsWith('section-')) {
		tokens.shift();
	}

	if (address_type_tokens.has(tokens[0])) {
		tokens.shift();
	}

	if (autofill_field_name_tokens.has(tokens[0])) {
		tokens.shift();
	} else {
		if (contact_type_tokens.has(tokens[0])) {
			tokens.shift();
		}

		if (autofill_contact_field_name_tokens.has(tokens[0])) {
			tokens.shift();
		} else {
			return false;
		}
	}

	if (tokens[0] === 'webauthn') {
		tokens.shift();
	}

	return tokens.length === 0;
}
