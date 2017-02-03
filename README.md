# ng2-slipper
An Angular 2 Component for Drag and Drop Sortable List

# Installation

`npm i ng2-slipper -S`

In your app.module.ts, include SlipperModule in your imports section.

```
import {SlipperModule} from 'ng2-slipper';

...

@NgModule({
  imports: [
    BrowserModule,
    SlipperModule.forRoot(),
    Routing
  ],

...
```

# Usage

```
<ul slipper [slipperItems]="keywords" (itemDragged)="keywordDragged($event)" [moveImagePath]="'/assets/img/move-arrows.png'">
    <li>
        <p class="key">Keyword</p>
        <p class="actions">Actions</p>
    </li>
    <li *ngFor="let keywordItem of (keywords | async)" slipperItem>
        <div>
          {{keywordItem.get('name')}}
        </div>
    </li>
</ul>

```

### Input Properties

- The `[slipperItems]` input property expects an observable of values being bound to your list items based on which the initialisation of the drag and drop event handlers is done.

- The `[moveImagePath]` optional property lets you specify a certain image which is shown when the item is being dragged. You can read more about it [here](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/setDragImage).

### Output Properties

- The `(itemDragged)` output property lets you listen to the event when an element from your list is dragged and dropped to a position in your list. The event handler provides two arguments as 

```
keywordDragged(data) {
  console.log(data.previousIndex);
  console.log(data.finalIndex);
}
```

### Note: 

You need to specify an attribute of `slipperItem` on your list items based on which the selection of the list items being "slipped" inside the slipper directive is done.

  
  
