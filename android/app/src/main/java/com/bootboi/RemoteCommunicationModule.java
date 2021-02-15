package com.bootboi;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import android.util.Log;

public class RemoteCommunicationModule extends ReactContextBaseJavaModule {
    RemoteCommunicationModule(ReactApplicationContext context) {
        super(context);
    }

    @ReactMethod
    public void wakeUp(String macAddress, Promise promise) {
        Log.d("RemoteCommunicationMod", "waking up " + macAddress);
        //wol = new WakeOnLan(macAddress)
        promise.resolve(true);
    }

    @Override
    public String getName() {
        return "RemoteCommunicationModule";
    }
}