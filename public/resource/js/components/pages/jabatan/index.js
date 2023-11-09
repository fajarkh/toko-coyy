(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["resource/js/components/pages/jabatan/index"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/jabatan/Form.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/jabatan/Form.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _eventBus_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventBus.js */ "./resources/js/pages/jabatan/eventBus.js");
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'JabatanForm',
  props: ['formData'],
  data: function data() {
    return {
      allError: []
    };
  },
  created: function created() {
    var _this = this;

    _eventBus_js__WEBPACK_IMPORTED_MODULE_0__["EventBus"].$on('sendErrors', function (val) {
      _this.allError = val;
    });
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/jabatan/Index.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/jabatan/Index.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Form_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Form.vue */ "./resources/js/pages/jabatan/Form.vue");
/* harmony import */ var _eventBus_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eventBus.js */ "./resources/js/pages/jabatan/eventBus.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var dialog = false;


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'jabatanIndex',
  components: {
    FormLayout: _Form_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      items: [],
      dialog: false,
      formTitle: 'Tambah Data',
      formData: {
        id: '',
        nama: '',
        deskripsi: ''
      }
    };
  },
  mounted: function mounted() {
    this.getItems();
  },
  methods: {
    resetForm: function resetForm(type) {
      var _this = this;

      this.formTitle = type !== null && type !== void 0 ? type : 'Tambah';
      Object.keys(this.formData).forEach(function (key) {
        _this.formData[key] = '';
      });
      _eventBus_js__WEBPACK_IMPORTED_MODULE_1__["EventBus"].$emit('sendErrors', []);
    },
    getItems: function getItems() {
      var _this2 = this;

      axios.get('/api/jabatan').then(function (res) {
        console.log(res.data);
        _this2.items = res.data.items;
      })["catch"](function (error) {
        _this2.errorMessage = error.response.data.message;
      });
    },
    addItem: function addItem() {
      var _this3 = this;

      if (this.$refs.form.validate()) {
        var formData = new FormData();
        var item = this.formData;

        for (var key in item = this.formData) {
          formData.append(key, item[key]);
        }

        axios.post('/api/jabatan', formData).then(function (res) {
          _this3.dialog = false;

          _this3.resetForm();

          _this3.getItems();

          _this3.$swal({
            text: res.data.message,
            icon: res.status === 200 ? 'success' : 'warning',
            timer: 2000,
            showConfirmButton: false
          });
        }, function (error) {
          _eventBus_js__WEBPACK_IMPORTED_MODULE_1__["EventBus"].$emit('sendErrors', error.response.data.errors);
        });
      }
    },
    updateItem: function updateItem(id) {
      var _this4 = this;

      var formData = new FormData();
      formData.append('_method', 'PUT');
      var item = this.formData;

      for (var key in item) {
        formData.append(key, item[key] == 'null' ? null : item[key]);
      }

      axios.post("/api/jabatan/".concat(id), formData).then(function (res) {
        _this4.dialog = false;

        _this4.resetForm();

        _this4.getItems();

        _this4.$swal({
          text: res.data.message,
          icon: res.status === 200 ? 'success' : 'warning',
          timer: 2000,
          showConfirmButton: false
        });
      }, function (error) {
        _eventBus_js__WEBPACK_IMPORTED_MODULE_1__["EventBus"].$emit('sendErrors', error.response.data.errors);
      });
    },
    deleteItem: function deleteItem(id) {
      var _this5 = this;

      this.$swal({
        title: 'Kamu Yakin?',
        text: "Tindakan ini akan menghapus secara permanent!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Iya, Lanjutkan!'
      }).then(function (result) {
        if (result.value) {
          axios["delete"]("/api/jabatan/".concat(id)).then(function (res) {
            _this5.getItems();

            _this5.$swal({
              text: res.data.message,
              icon: res.status === 200 ? 'success' : 'warning',
              timer: 2000,
              showConfirmButton: false
            });
          })["catch"](function (error) {
            _eventBus_js__WEBPACK_IMPORTED_MODULE_1__["EventBus"].$emit('sendErrors', error.response.data.errors);
          });
        }
      });
    },
    tambah: function tambah() {
      this.dialog = true;
      this.resetForm('Tambah');
    },
    edit: function edit(item) {
      this.resetForm('Edit');
      this.formTitle = 'Edit';
      this.dialog = true;

      for (var key in item) {
        if (typeof this.formData[key] !== 'undefined') {
          this.formData[key] = item[key];
        }
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/jabatan/Form.vue?vue&type=template&id=e8fb7b9e&":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/jabatan/Form.vue?vue&type=template&id=e8fb7b9e& ***!
  \**********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-row",
    [
      _c(
        "v-col",
        { attrs: { cols: "12" } },
        [
          _c("v-text-field", {
            attrs: { label: "Nama*", "error-messages": _vm.allError.nama },
            model: {
              value: _vm.formData.nama,
              callback: function($$v) {
                _vm.$set(_vm.formData, "nama", $$v)
              },
              expression: "formData.nama"
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-col",
        { attrs: { cols: "12" } },
        [
          _c("v-textarea", {
            attrs: { label: "Deksripsi" },
            model: {
              value: _vm.formData.deskripsi,
              callback: function($$v) {
                _vm.$set(_vm.formData, "deskripsi", $$v)
              },
              expression: "formData.deskripsi"
            }
          })
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/jabatan/Index.vue?vue&type=template&id=4b663835&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/jabatan/Index.vue?vue&type=template&id=4b663835& ***!
  \***********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "div",
        { staticClass: "text-left" },
        [
          _c(
            "v-btn",
            { attrs: { color: "primary" }, on: { click: _vm.tambah } },
            [
              _vm._v("Tambah\n            "),
              _c(
                "v-dialog",
                {
                  attrs: { activator: "parent", width: "auto" },
                  model: {
                    value: _vm.dialog,
                    callback: function($$v) {
                      _vm.dialog = $$v
                    },
                    expression: "dialog"
                  }
                },
                [
                  _c(
                    "v-card",
                    [
                      _c(
                        "v-form",
                        { ref: "form" },
                        [
                          _c("v-card-title", [
                            _c("span", { staticClass: "text-h5" }, [
                              _vm._v(_vm._s(_vm.formTitle))
                            ])
                          ]),
                          _vm._v(" "),
                          _c(
                            "v-container",
                            [
                              _c("FormLayout", {
                                attrs: { formData: _vm.formData }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-card-actions",
                            [
                              _c("v-spacer"),
                              _vm._v(" "),
                              _c(
                                "v-btn",
                                {
                                  on: {
                                    click: function($event) {
                                      _vm.dialog = false
                                    }
                                  }
                                },
                                [_vm._v("Batal")]
                              ),
                              _vm._v(" "),
                              _vm.formData.id == ""
                                ? _c(
                                    "v-btn",
                                    {
                                      attrs: { color: "primary" },
                                      on: {
                                        click: function($event) {
                                          $event.preventDefault()
                                          return _vm.addItem($event)
                                        }
                                      }
                                    },
                                    [_vm._v("Simpan")]
                                  )
                                : _c(
                                    "v-btn",
                                    {
                                      attrs: { color: "primary" },
                                      on: {
                                        click: function($event) {
                                          $event.preventDefault()
                                          return _vm.updateItem(_vm.formData.id)
                                        }
                                      }
                                    },
                                    [_vm._v("Ubah")]
                                  )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("v-simple-table", {
        scopedSlots: _vm._u([
          {
            key: "default",
            fn: function() {
              return [
                _c("thead", [
                  _c("tr", [
                    _c("th", { staticClass: "text-left" }, [_vm._v("Nama")]),
                    _vm._v(" "),
                    _c("th", { staticClass: "text-left" }, [_vm._v("Aksi")])
                  ])
                ]),
                _vm._v(" "),
                _c(
                  "tbody",
                  _vm._l(_vm.items, function(item) {
                    return _c("tr", [
                      _c("td", [_vm._v(_vm._s(item.nama))]),
                      _vm._v(" "),
                      _c(
                        "td",
                        [
                          _c(
                            "v-btn",
                            {
                              on: {
                                click: function($event) {
                                  $event.preventDefault()
                                  return _vm.edit(item)
                                }
                              }
                            },
                            [_vm._v("Edit")]
                          ),
                          _vm._v(" "),
                          _c(
                            "v-btn",
                            {
                              attrs: { color: "error" },
                              on: {
                                click: function($event) {
                                  $event.preventDefault()
                                  return _vm.deleteItem(item.id)
                                }
                              }
                            },
                            [_vm._v("Hapus")]
                          )
                        ],
                        1
                      )
                    ])
                  }),
                  0
                )
              ]
            },
            proxy: true
          }
        ])
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/pages/jabatan/Form.vue":
/*!*********************************************!*\
  !*** ./resources/js/pages/jabatan/Form.vue ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Form_vue_vue_type_template_id_e8fb7b9e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Form.vue?vue&type=template&id=e8fb7b9e& */ "./resources/js/pages/jabatan/Form.vue?vue&type=template&id=e8fb7b9e&");
/* harmony import */ var _Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Form.vue?vue&type=script&lang=js& */ "./resources/js/pages/jabatan/Form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Form_vue_vue_type_template_id_e8fb7b9e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Form_vue_vue_type_template_id_e8fb7b9e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/jabatan/Form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/jabatan/Form.vue?vue&type=script&lang=js&":
/*!**********************************************************************!*\
  !*** ./resources/js/pages/jabatan/Form.vue?vue&type=script&lang=js& ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/jabatan/Form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/jabatan/Form.vue?vue&type=template&id=e8fb7b9e&":
/*!****************************************************************************!*\
  !*** ./resources/js/pages/jabatan/Form.vue?vue&type=template&id=e8fb7b9e& ***!
  \****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_e8fb7b9e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Form.vue?vue&type=template&id=e8fb7b9e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/jabatan/Form.vue?vue&type=template&id=e8fb7b9e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_e8fb7b9e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_e8fb7b9e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/pages/jabatan/Index.vue":
/*!**********************************************!*\
  !*** ./resources/js/pages/jabatan/Index.vue ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Index_vue_vue_type_template_id_4b663835___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Index.vue?vue&type=template&id=4b663835& */ "./resources/js/pages/jabatan/Index.vue?vue&type=template&id=4b663835&");
/* harmony import */ var _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Index.vue?vue&type=script&lang=js& */ "./resources/js/pages/jabatan/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Index_vue_vue_type_template_id_4b663835___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Index_vue_vue_type_template_id_4b663835___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/jabatan/Index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/jabatan/Index.vue?vue&type=script&lang=js&":
/*!***********************************************************************!*\
  !*** ./resources/js/pages/jabatan/Index.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/jabatan/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/jabatan/Index.vue?vue&type=template&id=4b663835&":
/*!*****************************************************************************!*\
  !*** ./resources/js/pages/jabatan/Index.vue?vue&type=template&id=4b663835& ***!
  \*****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_4b663835___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=template&id=4b663835& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/jabatan/Index.vue?vue&type=template&id=4b663835&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_4b663835___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_4b663835___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/pages/jabatan/eventBus.js":
/*!************************************************!*\
  !*** ./resources/js/pages/jabatan/eventBus.js ***!
  \************************************************/
/*! exports provided: EventBus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventBus", function() { return EventBus; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var EventBus = new vue__WEBPACK_IMPORTED_MODULE_0___default.a();

/***/ })

}]);