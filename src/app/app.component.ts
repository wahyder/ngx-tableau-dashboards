import { Component } from '@angular/core';
import { VizCreateOptions, ToolbarPosition, TableauEvents } from 'ngx-tableau';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // Splitted Tableau Server URL and Report
  serverUrl = 'https://public.tableau.com';
  report = 'SuperSampleSuperstore/SuperDescriptive';

  // Options
  options: VizCreateOptions = {
    hideTabs: true,
    hideToolbar: false,
    disableUrlActionsPopups: true,
    toolbarPosition: ToolbarPosition.TOP,
    onFirstInteractive: (event) => {
      console.log('On first interactive event!', event);
    },
  };

  // Loaded event
  handleOnLoaded = (loaded) => console.log('Loaded', loaded);

  // Tableau Viz loaded event
  handleOnTableauVizLoaded = (tableauViz) => {
    console.log('Tableau viz loaded', tableauViz);

    tableauViz.addEventListener(TableauEvents.TAB_SWITCH, (event) => {
      console.log(
        `Tab changed from '${event.getOldSheetName()}' to '${event.getNewSheetName()}'`,
        event
      );
    });

    tableauViz.addEventListener(
      TableauEvents.PARAMETER_VALUE_CHANGE,
      (event) => {
        console.log(
          `Parameter '${event.getParameterName()}' value changed`,
          event
        );
      }
    );

    tableauViz.addEventListener(
      TableauEvents.MARKS_SELECTION,
      async (event) => {
        console.log('Marks selection', event);
        let marks = await event.getMarksAsync();
        console.log('Marks', marks);
        marks.forEach((mark) => {
          let pairs = mark.getPairs();
          pairs.forEach((pair) => {
            console.log('Selected mark pair', pair);
          });
        });
      }
    );
  };
}
