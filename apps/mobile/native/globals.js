/* eslint-disable @typescript-eslint/no-var-requires */
import "@azure/core-asynciterator-polyfill";
import '@formatjs/intl-locale/polyfill-force'
import '@formatjs/intl-pluralrules/polyfill-force'
import '@formatjs/intl-pluralrules/locale-data/en'

import 'react-native-url-polyfill/auto';
import "./polyfills/console-time.js"
global.Buffer = require('buffer').Buffer;
import '../app/common/logger/index';
import { DOMParser } from './worker.js';
global.DOMParser = DOMParser;
import {setI18nGlobal } from "@notesnook/intl";
import { i18n } from "@lingui/core";
import { ScriptManager, Script } from '@callstack/repack/client';
import {
  messages as $en
} from "@notesnook/intl/dist/locales/$en.json";
import {
  messages as $pseudo
} from "@notesnook/intl/dist/locales/$pseudo-LOCALE.json";
import Config from "react-native-config";

i18n.load({
  en: __DEV__ && Config.isTesting !== "true"  ? $pseudo : $en
});
setI18nGlobal(i18n);
i18n.activate("en");
setI18nGlobal(i18n);

try {
  ScriptManager.shared.addResolver(async (scriptId) => {
    // `scriptId` will be either 'student' or 'teacher'
  
    // In dev mode, resolve script location to dev server.
    if (__DEV__) {
      return {
        url: Script.getDevServerURL(scriptId),
        cache: false,
      };
    }
  
    return {
      url: Script.getFileSystemURL(scriptId)
    };
  });
  
} catch(e) {
  /** ignore error when running with metro bundler */
}