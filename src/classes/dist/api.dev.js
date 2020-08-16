"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _index = _interopRequireDefault(require("../store/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var api = {
  useAuth: function useAuth() {
    return {
      headers: {
        Authorization: 'Token ' + _index["default"].state.general.userToken,
        'Content-Type': 'multipart/form-data'
      }
    };
  },
  toFormData: function toFormData(obj) {
    var fd = new FormData();
    Object.keys(obj).map(function (key) {
      console.log("obj[key]", obj[key]);
      fd.append(key, obj[key]);
    });
    return fd;
  },
  login: {
    sendPhone: function sendPhone(phone) {
      var type,
          response,
          _args = arguments;
      return regeneratorRuntime.async(function sendPhone$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              type = _args.length > 1 && _args[1] !== undefined ? _args[1] : "c";
              _context.next = 3;
              return regeneratorRuntime.awrap(_axios["default"].post(_index["default"].state.general.server + "/v1/users/registration/", api.toFormData({
                "phone": phone,
                "type_code": type
              })));

            case 3:
              response = _context.sent;
              return _context.abrupt("return", response.data);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    sendConfirmCode: function sendConfirmCode(phone, code) {
      var response;
      return regeneratorRuntime.async(function sendConfirmCode$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(_axios["default"].post(_index["default"].state.general.server + "/v1/users/confirmation/", api.toFormData({
                "phone": phone,
                "code": code
              })));

            case 2:
              response = _context2.sent;
              return _context2.abrupt("return", response.data);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  },
  account: {
    getOrders: function getOrders(status) {
      var response;
      return regeneratorRuntime.async(function getOrders$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(_axios["default"].get(_index["default"].state.general.server + "/v1/orders/?order_status=" + status, api.useAuth()));

            case 2:
              response = _context3.sent;
              return _context3.abrupt("return", response.data);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      });
    },
    getBid: function getBid(bidId) {
      var response;
      return regeneratorRuntime.async(function getBid$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(_axios["default"].get(_index["default"].state.general.server + "/v1/orders/".concat(bidId, "/"), api.useAuth()));

            case 2:
              response = _context4.sent;
              return _context4.abrupt("return", response.data);

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      });
    },
    getOrderResponses: function getOrderResponses(id) {
      var response;
      return regeneratorRuntime.async(function getOrderResponses$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(_axios["default"].get(_index["default"].state.general.server + "/v1/orders/" + id + "/replies/", api.useAuth()));

            case 2:
              response = _context5.sent;
              return _context5.abrupt("return", response.data);

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      });
    },
    newOrderResponse: function newOrderResponse(id, type) {
      var response;
      return regeneratorRuntime.async(function newOrderResponse$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(_axios["default"].patch(_index["default"].state.general.server + "/v1/orders/".concat(id, "/"), api.toFormData({
                status_code: type,
                reply_id: id
              }), api.useAuth()));

            case 2:
              response = _context6.sent;
              return _context6.abrupt("return", response.data);

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      });
    },
    getMasterOrders: function getMasterOrders(query) {
      var response;
      return regeneratorRuntime.async(function getMasterOrders$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(_axios["default"].get(_index["default"].state.general.server + "/v1/orders/" + query, api.useAuth()));

            case 2:
              response = _context7.sent;
              return _context7.abrupt("return", response.data);

            case 4:
            case "end":
              return _context7.stop();
          }
        }
      });
    },
    getAlbumPhotos: function getAlbumPhotos(albumId) {
      var response;
      return regeneratorRuntime.async(function getAlbumPhotos$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(_axios["default"].get(_index["default"].state.general.server + "/v1/albums/" + albumId + "/photos/", api.useAuth()));

            case 2:
              response = _context8.sent;
              return _context8.abrupt("return", response.data);

            case 4:
            case "end":
              return _context8.stop();
          }
        }
      });
    },
    createOrder: function createOrder(cityId, masterTypeId, requestDateFrom, requestDateTo, description, files) {
      var response;
      return regeneratorRuntime.async(function createOrder$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return regeneratorRuntime.awrap(_axios["default"].post(_index["default"].state.general.server + "/v1/orders/", api.toFormData(_objectSpread({
                city_id: cityId,
                master_type_id: masterTypeId,
                request_date_from: requestDateFrom,
                request_date_to: requestDateTo,
                description: description
              }, files)), api.useAuth()));

            case 2:
              response = _context9.sent;
              return _context9.abrupt("return", response.data);

            case 4:
            case "end":
              return _context9.stop();
          }
        }
      });
    },
    getLoginStatus: function getLoginStatus() {
      var response;
      return regeneratorRuntime.async(function getLoginStatus$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return regeneratorRuntime.awrap(_axios["default"].get(_index["default"].state.general.server + "/v1/users/", api.useAuth()));

            case 2:
              response = _context10.sent;
              return _context10.abrupt("return", response.data);

            case 4:
            case "end":
              return _context10.stop();
          }
        }
      });
    },
    logout: function logout() {
      var response;
      return regeneratorRuntime.async(function logout$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return regeneratorRuntime.awrap(_axios["default"].post(_index["default"].state.general.server + "/v1/users/logout/", null, api.useAuth()));

            case 2:
              response = _context11.sent;
              return _context11.abrupt("return", response.data);

            case 4:
            case "end":
              return _context11.stop();
          }
        }
      });
    },
    createClientSign: function createClientSign(order_id, selection_date, reply_id) {
      var response;
      return regeneratorRuntime.async(function createClientSign$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return regeneratorRuntime.awrap(_axios["default"].patch(_index["default"].state.general.server + "/v1/orders/".concat(order_id, "/"), api.toFormData({
                status_code: "ms",
                selection_date: selection_date,
                reply_id: reply_id
              }), api.useAuth()));

            case 2:
              response = _context12.sent;
              return _context12.abrupt("return", response.data);

            case 4:
            case "end":
              return _context12.stop();
          }
        }
      });
    },
    getMasterData: function getMasterData(masterId) {
      var response;
      return regeneratorRuntime.async(function getMasterData$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return regeneratorRuntime.awrap(_axios["default"].get(_index["default"].state.general.server + "/v1/users/masters/".concat(masterId, "/"), api.useAuth()));

            case 2:
              response = _context13.sent;
              return _context13.abrupt("return", response.data);

            case 4:
            case "end":
              return _context13.stop();
          }
        }
      });
    },
    master: {
      changeProfile: function changeProfile(masterId, types, name, desc) {
        var response;
        return regeneratorRuntime.async(function changeProfile$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return regeneratorRuntime.awrap(_axios["default"].patch(_index["default"].state.general.server + "/v1/users/masters/".concat(masterId, "/"), api.toFormData({
                  master_types: types,
                  name: name,
                  about_myself: desc
                }), api.useAuth()));

              case 2:
                response = _context14.sent;
                return _context14.abrupt("return", response.data);

              case 4:
              case "end":
                return _context14.stop();
            }
          }
        });
      },
      createResponse: function createResponse(orderId, dateFrom, dateTo, description, cost) {
        var response;
        return regeneratorRuntime.async(function createResponse$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.next = 2;
                return regeneratorRuntime.awrap(_axios["default"].post(_index["default"].state.general.server + "/v1/orders/".concat(orderId, "/replies/"), api.toFormData({
                  suggested_time_from: dateFrom,
                  suggested_time_to: dateTo,
                  comment: description,
                  cost: cost
                }), api.useAuth()));

              case 2:
                response = _context15.sent;
                return _context15.abrupt("return", response.data);

              case 4:
              case "end":
                return _context15.stop();
            }
          }
        });
      },
      changeBidStatus: function changeBidStatus(orderId, statusCode) {
        var response;
        return regeneratorRuntime.async(function changeBidStatus$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.next = 2;
                return regeneratorRuntime.awrap(_axios["default"].patch(_index["default"].state.general.server + "/v1/orders/".concat(orderId, "/"), api.toFormData({
                  status_code: statusCode
                }), api.useAuth()));

              case 2:
                response = _context16.sent;
                return _context16.abrupt("return", response.data);

              case 4:
              case "end":
                return _context16.stop();
            }
          }
        });
      },
      getReviews: function getReviews(masterId) {
        var response;
        return regeneratorRuntime.async(function getReviews$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _context17.next = 2;
                return regeneratorRuntime.awrap(_axios["default"].get(_index["default"].state.general.server + "/v2/feedbacks/?master_id=".concat(masterId), api.useAuth()));

              case 2:
                response = _context17.sent;
                return _context17.abrupt("return", response.data);

              case 4:
              case "end":
                return _context17.stop();
            }
          }
        });
      },
      getBalance: function getBalance() {
        var response;
        return regeneratorRuntime.async(function getBalance$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _context18.next = 2;
                return regeneratorRuntime.awrap(_axios["default"].get(_index["default"].state.general.server + "/v2/balance/", api.useAuth()));

              case 2:
                response = _context18.sent;
                return _context18.abrupt("return", response.data);

              case 4:
              case "end":
                return _context18.stop();
            }
          }
        });
      }
    },
    client: {
      submitReview: function submitReview(nickname, master_id, rating, comment) {
        var response;
        return regeneratorRuntime.async(function submitReview$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                _context19.next = 2;
                return regeneratorRuntime.awrap(_axios["default"].post(_index["default"].state.general.server + "/v2/feedbacks/", api.toFormData({
                  nickname: nickname,
                  master_id: master_id,
                  rating: rating,
                  comment: comment
                }), api.useAuth()));

              case 2:
                response = _context19.sent;
                return _context19.abrupt("return", response.data);

              case 4:
              case "end":
                return _context19.stop();
            }
          }
        });
      },
      getNeedReviews: function getNeedReviews() {
        var response;
        return regeneratorRuntime.async(function getNeedReviews$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                _context20.next = 2;
                return regeneratorRuntime.awrap(_axios["default"].get(_index["default"].state.general.server + "/v2/feedbacks/notifications/", api.useAuth()));

              case 2:
                response = _context20.sent;
                return _context20.abrupt("return", response.data);

              case 4:
              case "end":
                return _context20.stop();
            }
          }
        });
      }
    },
    uploadPhotos: function uploadPhotos(albumId, files) {
      var response;
      return regeneratorRuntime.async(function uploadPhotos$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              _context21.next = 2;
              return regeneratorRuntime.awrap(_axios["default"].post(_index["default"].state.general.server + "/v1/albums/".concat(albumId, "/photos/"), api.toFormData(_objectSpread({}, files)), api.useAuth()));

            case 2:
              response = _context21.sent;
              return _context21.abrupt("return", response.data);

            case 4:
            case "end":
              return _context21.stop();
          }
        }
      });
    }
  },
  errorHandler: function errorHandler(e, context, errors) {
    if (!e.response) {
      context.$message.error("Ошибка ынтырнета");
    } else {
      Object.keys(errors).map(function (key) {
        e.response.status = String(e.response.status);

        if (e.response.status === key) {
          errors[key]();
        }
      });
    }
  }
};
var _default = api;
exports["default"] = _default;