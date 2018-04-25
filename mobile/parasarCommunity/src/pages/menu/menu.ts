import { Component, ViewChild } from '@angular/core';
import { IonicPage, Nav, NavController } from 'ionic-angular';
import {SocialSharing} from "@ionic-native/social-sharing";

interface PageItem {
  title: string
  component: any
}
type PageList = PageItem[]

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
  // A reference to the ion-nav in our component
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'ContentPage';

  pages: PageList;

  constructor(
    public navCtrl: NavController,
    private socialShare: SocialSharing
  ) {
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Sign in', component: 'LoginPage' },
      { title: 'Signup', component: 'SignupPage' }
    ];
  }

  ionViewDidLoad() {
    console.log('Hello MenuPage Page');
  }

  openPage(page: PageItem) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  shareApp(){
    let message = "Parashar community APP, to share the information to connect and benefit the community people. Share this App so that each one us connects and share";
    let subject = "Share APP";
    let file = "assets/img/icon200.jpg";
    let url = "https://play.google.com/store/apps/details?id?id=com.parasharCommunity.app";
    this.socialShare.share(message, subject, file, url);
  }

}
