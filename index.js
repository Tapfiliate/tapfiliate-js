const handler = {
  get: function(target, name) {
    return target.hasOwnProperty(name) ? target[name] : (...args) => {
      window.__tap(name, ...args);
    };
  }
};

const target = {
  init: (accountId, createOptions = { integration: "npm-module" }, createCallback, detectOptions = {}, detectCallback) => {
    if (window.__tap) return;

    (function(t, a, p) {
      t.TapfiliateObject = a;
      t[a] = t[a] || function() {
        (t[a].q = t[a].q || []).push(arguments);
      };
    })(window, "__tap");

    var script = document.createElement("script");
    script.src = "https://script.tapfiliate.com/tapfiliate.js";
    script.type = "text/javascript";
    script.async = true;

    document.getElementsByTagName("head")[0].appendChild(script);

    script.addEventListener("error", function() {
      throw new Error(`${this.src} failed to load.`);
    });

    window.__tap("create", accountId, createOptions, createCallback);
    window.__tap("detect", detectOptions, detectCallback);
  }
};

var Tap = new Proxy(target, handler);

export default Tap;
