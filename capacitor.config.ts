import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.elizondo.creditosapp",
  appName: "CreditosApp",
  webDir: "dist",
  server: {
    cleartext: true,
    androidScheme: "https",
  },
};

export default config;
