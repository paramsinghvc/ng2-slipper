(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('rxjs/Rx')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common', 'rxjs/Rx'], factory) :
	(factory((global.slipper = global.slipper || {}),global.ng.core,global._angular_common,global.rxjs_Rx));
}(this, (function (exports,_angular_core,_angular_common,rxjs_Rx) { 'use strict';

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SlipperDirective = (function () {
    function SlipperDirective(el) {
        this.el = el;
        this.itemDragged = new _angular_core.EventEmitter();
    }
    SlipperDirective.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes && changes.slipperItems && this.slipperItems) {
            if (!this.sub) {
                this.sub = this.slipperItems.subscribe(function (res) {
                    setTimeout(function () {
                        this.init();
                    }.bind(_this));
                });
            }
        }
    };
    SlipperDirective.prototype.init = function () {
        var list = this.el.nativeElement;
        var itemsEl = list.querySelectorAll("[slipperitem]");
        var self = this;
        var s;
        for (var _i = 0, itemsEl_1 = itemsEl; _i < itemsEl_1.length; _i++) {
            var item = itemsEl_1[_i];
            if (!item.hasAttribute('eventHandlerAttached')) {
                item.addEventListener('dragstart', function (e) {
                    e.stopPropagation();
                    s = this;
                    s.style.border = '3px solid';
                    e.dataTransfer.effectAllowed = 'move';
                    if (self.moveImagePath) {
                        var img = new Image();
                        img.src = self.moveImagePath;
                        e.dataTransfer.setDragImage(img, 25, 0);
                    }
                    self.dragStartPosition = self.getNodeIndex(this.parentNode, this);
                });
                item.addEventListener('dragenter', function (e) {
                    if (s === this)
                        return;
                    // s.opacity = 0;
                    if (self.isbefore(s, this)) {
                        this.parentNode.insertBefore(s, this);
                    }
                    else {
                        this.parentNode.insertBefore(s, this.nextSibling);
                    }
                });
                item.addEventListener('dragend', function (e) {
                    // this.style.opacity = 1;
                    s.style.border = 'none';
                    var finalIndex = self.getNodeIndex(this.parentNode, this);
                    self.itemDragged.emit({
                        previousIndex: self.dragStartPosition,
                        finalIndex: finalIndex
                    });
                });
                item.setAttribute('draggable', 'true');
                item.style.cursor = 'move';
                item.setAttribute('eventHandlerAttached', 'true');
            }
        }
    };
    SlipperDirective.prototype.getNodeIndex = function (parentNode, childNode) {
        var childrenNodes = parentNode.querySelectorAll('[slipperitem]');
        return Array.prototype.indexOf.call(childrenNodes, childNode);
    };
    SlipperDirective.prototype.isbefore = function (a, b) {
        if (a.parentNode === b.parentNode) {
            for (var cur = a; cur; cur = cur.previousSibling) {
                if (cur === b) {
                    return true;
                }
            }
        }
        return false;
    };
    return SlipperDirective;
}());
__decorate$1([
    _angular_core.Input(),
    __metadata("design:type", rxjs_Rx.Observable)
], SlipperDirective.prototype, "slipperItems", void 0);
__decorate$1([
    _angular_core.Input(),
    __metadata("design:type", String)
], SlipperDirective.prototype, "moveImagePath", void 0);
__decorate$1([
    _angular_core.Output(),
    __metadata("design:type", _angular_core.EventEmitter)
], SlipperDirective.prototype, "itemDragged", void 0);
SlipperDirective = __decorate$1([
    _angular_core.Directive({
        selector: '[slipper]'
    }),
    __metadata("design:paramtypes", [_angular_core.ElementRef])
], SlipperDirective);

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.SlipperModule = SlipperModule_1 = (function () {
    function SlipperModule() {
    }
    SlipperModule.forRoot = function () {
        return {
            ngModule: SlipperModule_1,
            providers: []
        };
    };
    return SlipperModule;
}());
exports.SlipperModule = SlipperModule_1 = __decorate([
    _angular_core.NgModule({
        imports: [_angular_common.CommonModule],
        declarations: [SlipperDirective],
        exports: [SlipperDirective]
    })
], exports.SlipperModule);
var SlipperModule_1;

Object.defineProperty(exports, '__esModule', { value: true });

})));
