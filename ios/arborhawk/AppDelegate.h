#import <GoogleMaps/GoogleMaps.h>
#import <RCTAppDelegate.h>
#import <UIKit/UIKit.h>

@interface AppDelegate : RCTAppDelegate
[GMSServices provideAPIKey:@"YOUR_GOOGLE_MAPS_API_KEY"];
@end
