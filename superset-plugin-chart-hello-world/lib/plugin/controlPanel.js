"use strict";

exports.__esModule = true;
exports.formDataOverrides = exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _core = require("@superset-ui/core");
var _chartControls = require("@superset-ui/chart-controls");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
// Helper functions to replace isAdhocColumn and isPhysicalColumn
var isAdhocColumn = col => typeof col === 'object' && 'label' in col;
var isPhysicalColumn = col => typeof col === 'string';
var config = {
  controlPanelSections: [{
    label: (0, _core.t)('Query'),
    expanded: true,
    controlSetRows: [[{
      name: 'groupbyColumns',
      config: {
        type: 'SelectControl',
        label: (0, _core.t)('Columns'),
        description: (0, _core.t)('Columns to group by on the columns'),
        multi: true,
        optionRenderer: c => /*#__PURE__*/_react.default.createElement(_chartControls.ColumnOption, {
          column: c,
          showType: true
        }),
        valueRenderer: c => /*#__PURE__*/_react.default.createElement(_chartControls.ColumnOption, {
          column: c
        }),
        valueKey: 'column_name',
        mapStateToProps: state => {
          var _state$datasource;
          return {
            options: ((_state$datasource = state.datasource) == null ? void 0 : _state$datasource.columns) || []
          };
        }
      }
    }], [{
      name: 'groupbyRows',
      config: {
        type: 'SelectControl',
        label: (0, _core.t)('Rows'),
        description: (0, _core.t)('Columns to group by on the rows'),
        multi: true,
        optionRenderer: c => /*#__PURE__*/_react.default.createElement(_chartControls.ColumnOption, {
          column: c,
          showType: true
        }),
        valueRenderer: c => /*#__PURE__*/_react.default.createElement(_chartControls.ColumnOption, {
          column: c
        }),
        valueKey: 'column_name',
        mapStateToProps: state => {
          var _state$datasource2;
          return {
            options: ((_state$datasource2 = state.datasource) == null ? void 0 : _state$datasource2.columns) || []
          };
        }
      }
    }], ['metrics'], ['adhoc_filters'], ['row_limit']]
  }]
};

// Define a separate function for form data overrides
var formDataOverrides = formData => {
  var groupbyColumns = (formData.columns || []).filter(col => {
    var groupbyRows = (0, _core.ensureIsArray)(formData.groupbyRows);
    return !groupbyRows.some(row => isPhysicalColumn(row) && isPhysicalColumn(col) && row === col || isAdhocColumn(row) && isAdhocColumn(col) && row.label === col.label);
  });
  var filteredColumns = (formData.columns || []).filter(col => {
    return !groupbyColumns.some(groupCol => isPhysicalColumn(groupCol) && isPhysicalColumn(col) && groupCol === col || isAdhocColumn(groupCol) && isAdhocColumn(col) && groupCol.label === col.label);
  });
  return _extends({}, formData, {
    columns: filteredColumns,
    groupbyColumns
  });
};
exports.formDataOverrides = formDataOverrides;
var _default = exports.default = config;