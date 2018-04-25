import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { ICommunity } from "../../models/community";


@IonicPage()
@Component({
  selector: "page-tabs",
  templateUrl: "tabs.html"
})
export class TabsPage {
  // tab1Root: any = Tab1Root;
  tab2Root: any = "SearchPage";
  // tab3Root: any = Tab3Root;
  community: ICommunity;

  // tab1Title = " ";
  // tab2Title = " ";
  // tab3Title = " ";

  constructor(
    public navCtrl: NavController,
    public translateService: TranslateService,
    private navParams: NavParams
  ) {
    // translateService.get(['TAB1_TITLE', 'TAB2_TITLE', 'TAB3_TITLE']).subscribe(values => {
    //   this.tab1Title = values['TAB1_TITLE'];
    //   this.tab2Title = values['TAB2_TITLE'];
    //   this.tab3Title = values['TAB3_TITLE'];
    // });

    this.community = this.navParams.data.community;

  }
}
