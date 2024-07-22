import { readFileSync } from 'fs';
import { join } from 'path';
import ScriptMetadata = Tampermonkey.ScriptMetadata;

type I18nField = { [locale: string]: string };

interface UserScriptOptions {
	'require-template': string;
	name: string;
	'i18n-names': I18nField;
	namespace: string;
	description: string;
	'i18n-descriptions': I18nField;
	version: string;
	author: string;
	homepage: string;
	homepageURL: string;
	website: string;
	source: string;
	icon: string;
	iconURL: string;
	defaulticon: string;
	icon64: string;
	icon64URL: string;
	updateURL: string;
	downloadURL: string;
	supportURL: string;
	license: string;
	include: string[];
	match: string[];
	exclude: string[];
	require: string[];
	resources: string[];
	connect: string[];
	'run-at': string;
	grant: string[];
	antifeature: string[];
	noframes: boolean;
	nocompat: string;
}

interface PackageJsonOptions {
	name: string;
	version: string;
	description: string;
	author: string;
	license: string;
	homepage: string;
	userscript: Partial<ScriptMetadata>;
	dependencies: { [key: string]: string };
}

export default function () {
	const packageJsonRaw = readFileSync(join(__dirname, '../package.json'), 'utf8');
	const packageJson = JSON.parse(packageJsonRaw) as Partial<PackageJsonOptions>;
	const userscript = packageJson.userscript as Partial<UserScriptOptions>;

	const dependencyVersionRegExp = /^[\^~]/;
	const headers = ['// ==UserScript=='];

	if (packageJson.name || userscript.name) {
		headers.push(`// @name ${userscript.name ?? packageJson.name}`);
	} else {
		throw new Error('No name specified in package.json');
	}

	if (userscript['i18n-names'] && typeof userscript['i18n-names'] === 'object') {
		for (const [locale, name] of Object.entries(userscript['i18n-names'])) {
			headers.push(`// @name:${locale} ${name}`);
		}
	}

	if (packageJson.version || userscript.version) {
		headers.push(`// @version ${userscript.version ?? packageJson.version}`);
	} else {
		throw new Error('No version specified in package.json');
	}

	if (userscript.namespace) {
		headers.push(`// @namespace ${userscript.namespace}`);
	}

	if (packageJson.description || userscript.description) {
		headers.push(`// @description ${userscript.description ?? packageJson.description}`);
	}

	if (userscript['i18n-descriptions'] && typeof userscript['i18n-descriptions'] === 'object') {
		for (const [locale, description] of Object.entries(userscript['i18n-descriptions'])) {
			headers.push(`// @description:${locale} ${description}`);
		}
	}

	if (packageJson.author || userscript.author) {
		headers.push(`// @author ${userscript.author ?? packageJson.author}`);
	}

	if (packageJson.homepage || userscript.homepage) {
		headers.push(`// @homepage ${userscript.homepage ?? packageJson['homepage']}`);
	} else if (userscript.homepageURL) {
		headers.push(`// @homepageURL ${userscript.homepageURL}`);
	} else if (userscript.website) {
		headers.push(`// @website ${userscript.website}`);
	} else if (userscript.source) {
		headers.push(`// @source ${userscript.source}`);
	}

	if (userscript.icon) {
		headers.push(`// @icon ${userscript.icon}`);
	} else if (userscript.iconURL) {
		headers.push(`// @iconURL ${userscript.iconURL}`);
	} else if (userscript.defaulticon) {
		headers.push(`// @defaulticon ${userscript.defaulticon}`);
	}

	if (userscript.icon64) {
		headers.push(`// @icon64 ${userscript.icon64}`);
	} else if (userscript.icon64URL) {
		headers.push(`// @icon64URL ${userscript.icon64URL}`);
	}

	if (userscript.updateURL) {
		headers.push(`// @updateURL ${userscript.updateURL}`);
	}

	if (userscript.downloadURL) {
		headers.push(`// @downloadURL ${userscript.downloadURL}`);
	}

	if (userscript.supportURL) {
		headers.push(`// @supportURL ${userscript.supportURL}`);
	}

	if (packageJson.license || userscript.license) {
		headers.push(`// @license ${packageJson.license ?? userscript.license}`);
	}

	if (userscript.include && userscript.include instanceof Array) {
		for (const include of userscript.include) {
			headers.push(`// @include ${include}`);
		}
	}

	if (userscript.match && userscript.match instanceof Array) {
		for (const match of userscript.match) {
			headers.push(`// @match ${match}`);
		}
	}

	if (userscript.exclude && userscript.exclude instanceof Array) {
		for (const exclude of userscript.exclude) {
			headers.push(`// @exclude ${exclude}`);
		}
	}

	if (packageJson.dependencies) {
		const urlTemplate =
			userscript['require-template'] ?? 'https://cdn.jsdelivr.net/npm/${dependencyName}@${dependencyVersion}';
		const requireTemplate = `// @require ${urlTemplate}`;
		for (const dependencyName in packageJson.dependencies) {
			const dependencyVersion = packageJson.dependencies[dependencyName].replace(dependencyVersionRegExp, '');
			headers.push(
				requireTemplate
					.replace('${dependencyName}', dependencyName)
					.replace('${dependencyVersion}', dependencyVersion)
					.replace('{dependencyName}', dependencyName)
					.replace('{dependencyVersion}', dependencyVersion),
			);
		}
	}

	if (userscript.require && userscript.require instanceof Array) {
		for (const require of userscript.require) {
			headers.push(`// @require ${require}`);
		}
	}

	if (userscript.resources && userscript.resources instanceof Array) {
		for (const resource of userscript.resources) {
			headers.push(`// @resource ${resource}`);
		}
	}

	if (userscript.connect && userscript.connect instanceof Array) {
		for (const connect of userscript.connect) {
			headers.push(`// @connect ${connect}`);
		}
	}

	if (userscript['run-at']) {
		headers.push(`// @run-at ${userscript['run-at']}`);
	}

	if (userscript.grant && userscript.grant instanceof Array) {
		for (const grant of userscript.grant) {
			headers.push(`// @grant ${grant}`);
		}
	}

	if (userscript.antifeature && userscript.antifeature instanceof Array) {
		for (const antifeature of userscript.antifeature) {
			headers.push(`// @antifeature ${antifeature}`);
		}
	}

	if (userscript.noframes) {
		headers.push('// @noframes');
	}

	if (userscript.nocompat) {
		headers.push(`// @nocompat ${userscript.nocompat}`);
	}

	headers.push('// ==/UserScript==\n');
	return headers.join('\n');
}
