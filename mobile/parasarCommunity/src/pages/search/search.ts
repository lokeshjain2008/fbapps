import { Component, Inject } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { Item } from "../../models/item";
import { Items } from "../../providers/providers";
import { CommunityId } from "../../app/app.module";
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { IMessage } from "../../models/message";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { SocialSharing } from "@ionic-native/social-sharing";
import { PlayStoreShareString } from "../../secrets/secrets";
import { AdMobPro } from "@ionic-native/admob-pro";

export const MessageLimit = 21;

@IonicPage()
@Component({
  selector: "page-search",
  templateUrl: "search.html"
})
export class SearchPage {
  currentItems: any = [];
  currentCategory: string;
  messageColl: AngularFirestoreCollection<IMessage>;
  messages: Observable<IMessage[]> = of([<IMessage>{}]);

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    @Inject(CommunityId) private communityId: string,
    private db: AngularFirestore,
    public items: Items,
    private share: SocialSharing,
    private adMobd: AdMobPro
  ) {
    this.currentCategory = this.navParams.data;
    console.log(this.currentCategory, "--->current Category");
    if(this.currentCategory != 'all'){
      this.messageColl = this.db.collection(`communities/${this.communityId}/${this.currentCategory}`,
    (ref)=>ref.orderBy('created_at', 'desc').limit(MessageLimit)
  );
    }else {
      this.messageColl = this.db.collection(`communities/${this.communityId}/messages`,
      (ref)=>ref.orderBy('created_at', 'desc').limit(MessageLimit));
    }
  }

  ionViewDidLoad(){
    this.messages = this.messageColl.valueChanges();
  }

  shareMessage(message){

    let msg = ` ${message.title}
    पराशर समुदाय से जुड़ने के लिए ऐप डाउनलोड करें,
    जय श्री पाराशर जी!, ${PlayStoreShareString}
    `
    this.share.share(msg)
    .then(()=>{
      this.adMobd.prepareInterstitial({
        adId: 'ca-app-pub-0016905624286295/3727194198',
        autoShow: true
      })
    });
  }

  /**
   * Perform a service for the proper items.
   */
  getItems(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentItems = [];
      return;
    }
    this.currentItems = this.items.query({
      name: val
    });
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push("ItemDetailPage", {
      item: item
    });
  }
}
