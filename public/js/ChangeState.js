/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/changeState.js":
/*!*******************************!*\
  !*** ./src/js/changeState.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function(){\r\n    //alert('cambiarestado.js')\r\n    const changeStateBtn = document.querySelectorAll('.change-state')\r\n    const token = document.querySelector('meta[name=\"csrf-token\"]').getAttribute('content')\r\n\r\n    changeStateBtn.forEach( b => {\r\n        b.addEventListener('click',changeStateProperty)\r\n    });\r\n\r\n    async function changeStateProperty(e){\r\n        const { propertyid: id } = e.target.dataset\r\n        //console.log(id)\r\n\r\n        try {\r\n            const url = `/properties/changeState/${ id }`\r\n\r\n            const resp = await fetch(url,{\r\n                method:'PUT',\r\n                headers: {\r\n                    'CSRF-Token': token\r\n                }\r\n            })\r\n    \r\n            console.log(resp)            \r\n        } catch (error) {\r\n            console.log(error)    \r\n        }\r\n    }\r\n\r\n})()\n\n//# sourceURL=webpack://bienesraices/./src/js/changeState.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/changeState.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;