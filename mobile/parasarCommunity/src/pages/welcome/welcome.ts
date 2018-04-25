import { Component, Inject } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";

import { CommunityId } from "../../app/app.module";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";
import { ICommunity } from "../../models/community";

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
 */
@IonicPage()
@Component({
  selector: "page-welcome",
  templateUrl: "welcome.html"
})
export class WelcomePage {
  community: Observable<ICommunity>;
  communityDoc: AngularFirestoreDocument<ICommunity>;

  constructor(
    public navCtrl: NavController,
    private db: AngularFirestore,
    @Inject(CommunityId) private communityId: string
  ) {
    this.communityDoc = this.db.doc(`communities/${this.communityId}`);
    this.community = this.communityDoc.valueChanges();
  }

  login() {
    this.navCtrl.push("LoginPage");
  }

  signup() {
    this.navCtrl.push("SignupPage");
  }

  ngOnInit() {
    this.community.subscribe((community: ICommunity) => {
      console.log("From the welcome,", community);
      this.navCtrl.setRoot("TabsPage", {
        community
      });
    });
  }
}
