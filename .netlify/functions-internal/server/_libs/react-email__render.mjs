import "./react-dom.mjs";
import "./deepmerge.mjs";
import "./js-beautify.mjs";
import { Writable } from "node:stream";
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
var decoder = new TextDecoder("utf-8");
var readStream = (stream) => __async(void 0, null, function* () {
  let result = "";
  if ("pipeTo" in stream) {
    const writableStream = new WritableStream({
      write(chunk) {
        result += decoder.decode(chunk);
      }
    });
    yield stream.pipeTo(writableStream);
  } else {
    const writable = new Writable({
      write(chunk, _encoding, callback) {
        result += decoder.decode(chunk);
        callback();
      }
    });
    stream.pipe(writable);
    return new Promise((resolve, reject) => {
      writable.on("error", reject);
      writable.on("close", () => {
        resolve(result);
      });
    });
  }
  return result;
});
var renderAsync = (component, options) => __async(void 0, null, function* () {
  const { default: reactDOMServer } = yield import("./react-dom.mjs").then(function(n) {
    return n.s;
  });
  let html;
  if (Object.hasOwn(reactDOMServer, "renderToReadableStream")) {
    html = yield readStream(
      yield reactDOMServer.renderToReadableStream(component)
    );
  } else {
    yield new Promise((resolve, reject) => {
      const stream = reactDOMServer.renderToPipeableStream(component, {
        onAllReady() {
          return __async(this, null, function* () {
            html = yield readStream(stream);
            resolve();
          });
        },
        onError(error) {
          reject(error);
        }
      });
    });
  }
  const doctype = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';
  const document = `${doctype}${html.replace(/<!DOCTYPE.*?>/, "")}`;
  return document;
});
export {
  renderAsync as r
};
