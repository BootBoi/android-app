package com.bootboi;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.github.bootboi.WakeOnLan;
import com.github.bootboi.SshCommand;

public class RemoteCommunicationModule extends ReactContextBaseJavaModule {
    RemoteCommunicationModule(ReactApplicationContext context) {
        super(context);
    }

    @ReactMethod
    public void wakeUp(String macAddress, Promise promise) {
        try {
            WakeOnLan wol = new WakeOnLan(macAddress);
            wol.wakeUp();
            promise.resolve(true);
        } catch (Exception exception) {
            promise.reject(exception);
        }

    }

    @ReactMethod
    public void powerOff(String host, int port, String user, String password, Promise promise) {
        SshCommand sshCommand = new SshCommand(host, port, user, password);
        try {
            String result = sshCommand.powerOff();
            promise.resolve(result);
        } catch (Exception exception) {
            promise.reject(exception);
        }
    }

    @ReactMethod
    public void reboot(String host, int port, String user, String password, Promise promise) {
        SshCommand sshCommand = new SshCommand(host, port, user, password);
        try {
            String result = sshCommand.reboot();
            promise.resolve(result);
        } catch (Exception exception) {
            promise.reject(exception);
        }
    }

    @ReactMethod
    public void whoAmI(String host, int port, String user, String password, Promise promise) {
        SshCommand sshCommand = new SshCommand(host, port, user, password);
        try {
            String result = sshCommand.whoAmI();
            promise.resolve(result);
        } catch (Exception exception) {
            promise.reject(exception);
        }
    }

    @ReactMethod
    public void canExecuteAsRoot(String host, int port, String user, String password, Promise promise) {
        SshCommand sshCommand = new SshCommand(host, port, user, password);
        try {
            Boolean result = sshCommand.canExecuteAsRoot();
            promise.resolve(result);
        } catch (Exception exception) {
            promise.reject(exception);
        }
    }

    @ReactMethod
    public void isReachable(String host, int port, String user, String password, Promise promise) {
        SshCommand sshCommand = new SshCommand(host, port, user, password);
        promise.resolve(sshCommand.isReachable());
    }

    @Override
    public String getName() {
        return "RemoteCommunicationModule";
    }
}