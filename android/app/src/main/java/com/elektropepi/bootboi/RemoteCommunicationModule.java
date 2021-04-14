package com.elektropepi.bootboi;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.github.bootboi.SshCommandException;
import com.github.bootboi.WakeOnLan;
import com.github.bootboi.SshCommand;

import org.jetbrains.annotations.NotNull;

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
    public void powerOff(String host, int port, String user, String password, int timeout, Promise promise) {
        new SshCommandThread(host, port, user, password, timeout, promise, SshCommand::powerOff).start();
    }

    @ReactMethod
    public void reboot(String host, int port, String user, String password, int timeout, Promise promise) {
        new SshCommandThread(host, port, user, password, timeout, promise, SshCommand::reboot).start();
    }

    @ReactMethod
    public void whoAmI(String host, int port, String user, String password, int timeout, Promise promise) {
        new SshCommandThread(host, port, user, password, timeout, promise, SshCommand::whoAmI).start();
    }

    @ReactMethod
    public void canExecuteAsRoot(String host, int port, String user, String password, int timeout, Promise promise) {
        new SshCommandThread(host, port, user, password, timeout, promise, SshCommand::canExecuteAsRoot).start();
    }

    @ReactMethod
    public void isReachable(String host, int port, String user, String password, Promise promise) {
        new SshCommandThread(host, port, user, password, 0, promise, SshCommand::isReachable).start();
    }

    @NotNull
    @Override
    public String getName() {
        return "RemoteCommunicationModule";
    }

    @FunctionalInterface
    interface SshCommandFunction<T, R> {
        R apply(T t) throws SshCommandException;
    }

    static class SshCommandThread extends Thread {
        private final SshCommandFunction<SshCommand, Object> call;
        private final SshCommand sshCommand;
        private final Promise promise;

        SshCommandThread(String host, int port, String user, String password, int timeout, Promise promise, SshCommandFunction<SshCommand, Object> call) {
            this.promise = promise;
            this.sshCommand = new SshCommand(host, port, user, password, timeout);
            this.call = call;
        }

        public void run() {
            try {
                promise.resolve(call.apply(sshCommand));
            } catch (Exception exception) {
                promise.reject(exception);
            }
        }
    }
}
