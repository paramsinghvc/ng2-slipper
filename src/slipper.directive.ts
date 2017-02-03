import { Directive, ElementRef, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Directive({
	selector: '[slipper]'
})
export class SlipperDirective {

	@Input() public slipperItems: Observable<any>;
	@Input() public moveImagePath: string;
	@Output() public itemDragged: EventEmitter<any> = new EventEmitter();

	sub: any;
	dragStartPosition: number;

	public constructor(private el: ElementRef) { }

	ngOnChanges(changes: any) {
		if (changes && changes.slipperItems && this.slipperItems) {
			if (!this.sub) {
				this.sub = this.slipperItems.subscribe(res => {
					setTimeout(function() {
						this.init();
					}.bind(this));
				})
			}
		}
	}

	init() {


		let list = this.el.nativeElement;
		let itemsEl = list.querySelectorAll("[slipperitem]");
		let self = this;
		let s: any;

		for (let item of itemsEl) {

			if (!item.hasAttribute('eventHandlerAttached')) {

				item.addEventListener('dragstart', function(e: any) {
					e.stopPropagation();
					s = this;
					s.style.border = '3px solid';
					e.dataTransfer.effectAllowed = 'move';
					if (self.moveImagePath) {
						let img = new Image();
						img.src = self.moveImagePath;						
						e.dataTransfer.setDragImage(img, 25, 0);
					}

					self.dragStartPosition = self.getNodeIndex(this.parentNode, this);

				});

				item.addEventListener('dragenter', function(e: any) {
					if (s === this) return;
					// s.opacity = 0;

					if (self.isbefore(s, this)) {
						this.parentNode.insertBefore(s, this);
					} else {
						this.parentNode.insertBefore(s, this.nextSibling);
					}

				});

				item.addEventListener('dragend', function(e: any) {
					// this.style.opacity = 1;
					s.style.border = 'none';
					let finalIndex = self.getNodeIndex(this.parentNode, this);

					self.itemDragged.emit({
						previousIndex: self.dragStartPosition,
						finalIndex
					})
				});

				item.setAttribute('draggable', 'true');
				item.style.cursor = 'move';
				item.setAttribute('eventHandlerAttached', 'true');
			}
		}

	}

	getNodeIndex(parentNode: any, childNode: any) {
		let childrenNodes = parentNode.querySelectorAll('[slipperitem]');
		return Array.prototype.indexOf.call(childrenNodes, childNode);
	}

	isbefore(a: any, b: any) {
		if (a.parentNode === b.parentNode) {
			for (var cur = a; cur; cur = cur.previousSibling) {
				if (cur === b) {
					return true;
				}
			}
		}
		return false;
	}

}