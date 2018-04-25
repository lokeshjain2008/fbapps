import { Component, ViewChild } from "@angular/core";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { TranslateService } from "@ngx-translate/core";
import { Config, Nav, Platform } from "ionic-angular";
import { Firebase } from '@ionic-native/firebase';
import { AdMobPro } from '@ionic-native/admob-pro';
import { SocialSharing} from "@ionic-native/social-sharing";
import { Settings } from "../providers/providers";
import {  AD_ANDROID_BANNER, PlayStoreShareString } from "../secrets/secrets";


// ca-app-pub-0016905624286295~1940713074
//ca-app-pub-0016905624286295/7398845898


@Component({
  template: `<ion-menu [content]="content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
          {{p.title}}
        </button>
        <button ion-item (click)="shareApp()">
         Share App <ion-icon name="heart"></ion-icon>
        </button>
      </ion-list>
    </ion-content>

  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = "WelcomePage";

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: "Home", component: "WelcomePage" },
    { title: "About", component: "AboutPage" },
    //{ title: "Credits", component: "CreditPage" },
    //{ title: "Feedback/साुझाव", component: "FeedbackPage"}
  ];

  constructor(
    private translate: TranslateService,
    platform: Platform,
    settings: Settings,
    private config: Config,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private fcm: Firebase,
    private socialShare: SocialSharing,
    private adMob: AdMobPro
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // Note: you need to check if you are on browser or the device.
      if (platform.is('cordova')) {
       this.setupPushNotification();
      }

      this.showAd();

    });
    this.initTranslate();
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang("en");
    const browserLang = this.translate.getBrowserLang();

    if (browserLang == "hi") {
      this.translate.use("hi");
    } else {
      this.translate.use("en"); // Set your language here
    }

    this.translate.get(["BACK_BUTTON_TEXT"]).subscribe(values => {
      this.config.set("ios", "backButtonText", values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  private setupPushNotification() {
    this.fcm.subscribe("parashar");

    this.fcm.getToken().then(token => {
      console.log(`got token ${token}.`);
    });

    this.fcm.onNotificationOpen().subscribe(data => {
      if (data.wasTapped) {
        console.log("Received in background");
      } else {
        console.log("Received in foreground");
      }
    });

    this.fcm.onTokenRefresh().subscribe(token => {
      console.log(`token refreshed ${token}`);
    });
    // Note sure about the unsubscription..
    //this.fcm.unsubscribeFromTopic("marketing");
  }

  shareApp(){
    let message = `Parashar community APP, to share the information to connect and benefit the community people.
                  Share this App so that each one us connects and share.  ${PlayStoreShareString}`;
    let subject = "Share APP";
    this.socialShare.share(message, subject);
  }

  showAd(){
    this.adMob.createBanner({
      adId: AD_ANDROID_BANNER,
      autoShow: true });
  }

}
