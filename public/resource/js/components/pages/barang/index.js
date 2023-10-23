(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["resource/js/components/pages/barang/index"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/barang/Index.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/barang/Index.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
  name: 'BarangIndex',
  components: {},
  data: function data() {
    return {
      items: [],
      dialog: false,
      formTitle: 'Tambah Data',
      errorMessage: '',
      formData: {
        id: '',
        nama: '',
        merek: '',
        kategori: '',
        satuan: ''
      }
    };
  },
  mounted: function mounted() {
    this.getItems();
  },
  methods: {
    getItems: function getItems() {
      var _this = this;

      axios.get('/api/barang').then(function (res) {
        _this.items = res.data;
      })["catch"](function (error) {
        console.log(error);
        _this.errorMessage = error.response.data.message;
      });
    },
    addItem: function addItem() {
      var _this2 = this;

      if (this.$refs.form.validate()) {
        var postData = new FormData();
        postData.append("nama", this.formData.nama);
        postData.append("merek", this.formData.merek);
        postData.append("satuan", this.formData.satuan);
        postData.append("kategori", this.formData.kategori);
        axios.post('/api/barang', postData).then(function (res) {
          _this2.dialog = false;

          _this2.resetForm();

          _this2.getItems();

          _this2.$swal({
            text: res.data.message,
            icon: res.status === 200 ? 'success' : 'warning',
            timer: 2000,
            showConfirmButton: false
          });
        }, function (error) {
          console.log(error.response.data);
          _this2.errorMessage = error.response.data.message;
        });
      }
    },
    updateItem: function updateItem(id) {
      var _this3 = this;

      var postData = new FormData();
      postData.append('_method', 'PUT');
      postData.append("nama", this.formData.nama);
      postData.append("merek", this.formData.merek);
      postData.append("kategori", this.formData.kategori);
      postData.append("satuan", this.formData.satuan);
      axios.post("/api/barang/".concat(id), postData).then(function (res) {
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
        console.log(error.response.data);
        _this3.errorMessage = error.response.data.message;
      });
    },
    deleteItem: function deleteItem(id) {
      var _this4 = this;

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
          axios["delete"]("/api/barang/".concat(id)).then(function (res) {
            console.log(res);

            _this4.getItems();

            _this4.$swal({
              text: res.data.message,
              icon: res.status === 200 ? 'success' : 'warning',
              timer: 2000,
              showConfirmButton: false
            });
          })["catch"](function (error) {
            console.log(error);
            _this4.errorMessage = error.response.data.message;
          });
        }
      });
    },
    tambah: function tambah() {
      this.dialog = true;
      this.resetForm();
    },
    edit: function edit(item) {
      this.dialog = true;
      this.formTitle = 'Edit';
      this.formData.id = item.id;
      this.formData.nama = item.nama;
      this.formData.merek = item.merek;
      this.formData.kategori = item.kategori;
      this.formData.satuan = item.satuan;
    },
    resetForm: function resetForm() {
      this.formTitle = 'Tambah';
      this.formData.id = '';
      this.formData.nama = '';
      this.formData.merek = '';
      this.formData.kategori = '';
      this.formData.satuan = '';
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/barang/Index.vue?vue&type=template&id=86cdb31a&":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/barang/Index.vue?vue&type=template&id=86cdb31a& ***!
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
                            "v-card-text",
                            [
                              _c(
                                "v-container",
                                [
                                  this.errorMessage != ""
                                    ? _c(
                                        "v-alert",
                                        {
                                          attrs: {
                                            prominent: "",
                                            type: "error"
                                          }
                                        },
                                        [
                                          _c(
                                            "v-row",
                                            { attrs: { align: "center" } },
                                            [
                                              _c(
                                                "v-col",
                                                { staticClass: "grow" },
                                                [
                                                  _vm._v(
                                                    _vm._s(this.errorMessage)
                                                  )
                                                ]
                                              )
                                            ],
                                            1
                                          )
                                        ],
                                        1
                                      )
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _c(
                                    "v-row",
                                    [
                                      _c(
                                        "v-col",
                                        { attrs: { cols: "12" } },
                                        [
                                          _c("v-text-field", {
                                            attrs: {
                                              label: "Nama*",
                                              rules: _vm.inputRules
                                            },
                                            model: {
                                              value: _vm.formData.nama,
                                              callback: function($$v) {
                                                _vm.$set(
                                                  _vm.formData,
                                                  "nama",
                                                  $$v
                                                )
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
                                          _c("v-text-field", {
                                            attrs: {
                                              label: "Merek*",
                                              rules: _vm.inputRules
                                            },
                                            model: {
                                              value: _vm.formData.merek,
                                              callback: function($$v) {
                                                _vm.$set(
                                                  _vm.formData,
                                                  "merek",
                                                  $$v
                                                )
                                              },
                                              expression: "formData.merek"
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
                                          _c("v-text-field", {
                                            attrs: {
                                              label: "Kategori*",
                                              rules: _vm.inputRules
                                            },
                                            model: {
                                              value: _vm.formData.kategori,
                                              callback: function($$v) {
                                                _vm.$set(
                                                  _vm.formData,
                                                  "kategori",
                                                  $$v
                                                )
                                              },
                                              expression: "formData.kategori"
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
                                          _c("v-text-field", {
                                            attrs: {
                                              label: "Satuan*",
                                              rules: _vm.inputRules
                                            },
                                            model: {
                                              value: _vm.formData.satuan,
                                              callback: function($$v) {
                                                _vm.$set(
                                                  _vm.formData,
                                                  "satuan",
                                                  $$v
                                                )
                                              },
                                              expression: "formData.satuan"
                                            }
                                          })
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
                    _c("th", { staticClass: "text-left" }, [_vm._v("Merek")]),
                    _vm._v(" "),
                    _c("th", { staticClass: "text-left" }, [
                      _vm._v("Kategori")
                    ]),
                    _vm._v(" "),
                    _c("th", { staticClass: "text-left" }, [_vm._v("Satuan")]),
                    _vm._v(" "),
                    _c("th", { staticClass: "text-left" }, [_vm._v("Aksi")])
                  ])
                ]),
                _vm._v(" "),
                _c(
                  "tbody",
                  _vm._l(_vm.items, function(item) {
                    return _c("tr", { key: item.id }, [
                      _c("td", [_vm._v(_vm._s(item.nama))]),
                      _vm._v(" "),
                      _c("td", [_vm._v(_vm._s(item.merek))]),
                      _vm._v(" "),
                      _c("td", [_vm._v(_vm._s(item.kategori))]),
                      _vm._v(" "),
                      _c("td", [_vm._v(_vm._s(item.satuan))]),
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

/***/ "./resources/js/pages/barang/Index.vue":
/*!*********************************************!*\
  !*** ./resources/js/pages/barang/Index.vue ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Index_vue_vue_type_template_id_86cdb31a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Index.vue?vue&type=template&id=86cdb31a& */ "./resources/js/pages/barang/Index.vue?vue&type=template&id=86cdb31a&");
/* harmony import */ var _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Index.vue?vue&type=script&lang=js& */ "./resources/js/pages/barang/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Index_vue_vue_type_template_id_86cdb31a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Index_vue_vue_type_template_id_86cdb31a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/barang/Index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/barang/Index.vue?vue&type=script&lang=js&":
/*!**********************************************************************!*\
  !*** ./resources/js/pages/barang/Index.vue?vue&type=script&lang=js& ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/barang/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/barang/Index.vue?vue&type=template&id=86cdb31a&":
/*!****************************************************************************!*\
  !*** ./resources/js/pages/barang/Index.vue?vue&type=template&id=86cdb31a& ***!
  \****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_86cdb31a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=template&id=86cdb31a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/barang/Index.vue?vue&type=template&id=86cdb31a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_86cdb31a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_86cdb31a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);