"use strict";

exports.__esModule = true;
exports.default = void 0;
var _core = require("@superset-ui/core");
var _buildQuery = _interopRequireDefault(require("./buildQuery"));
var _controlPanel = _interopRequireDefault(require("./controlPanel"));
var _transformProps = _interopRequireDefault(require("./transformProps"));
var _thumbnail = _interopRequireDefault(require("../images/thumbnail.png"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n.default = e, t && t.set(e, n), n; } /**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
class SupersetPluginChartHelloWorld extends _core.ChartPlugin {
  /**
   * The constructor is used to pass relevant metadata and callbacks that get
   * registered in respective registries that are used throughout the library
   * and application. A more thorough description of each property is given in
   * the respective imported file.
   *
   * It is worth noting that `buildQuery` and is optional, and only needed for
   * advanced visualizations that require either post processing operations
   * (pivoting, rolling aggregations, sorting etc) or submitting multiple queries.
   */
  constructor() {
    var metadata = new _core.ChartMetadata({
      description: 'Superset Plugin Chart Hello World',
      name: (0, _core.t)('Hello World'),
      thumbnail: _thumbnail.default
    });
    super({
      buildQuery: _buildQuery.default,
      controlPanel: _controlPanel.default,
      loadChart: () => Promise.resolve().then(() => _interopRequireWildcard(require('../SupersetPluginChartHelloWorld'))),
      metadata,
      transformProps: _transformProps.default
    });
  }
}
exports.default = SupersetPluginChartHelloWorld;