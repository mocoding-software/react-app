import { MultiCompiler, Compiler } from "webpack"
import path from "path";
import * as FsModule from "fs";
import { Handler, RequestHandler } from "express";

const requireFromString = require('require-from-string');
const sourceMapSupport = require('source-map-support');

const createHandler = (error: any, serverRenderer: any) => (req: any, res: any, next: any) => {
    process.stdout.write(`Receive request ${req.url}`);
    if (error) {
        return next(error);
    }
    serverRenderer(req, res, next);
};

// const createKoaHandler = (error, serverRenderer) => (ctx, next) => {
//     debug(`Receive request ${ctx.url}`);
//     if (error) {
//         ctx.throw(error);
//     }
//     return serverRenderer(ctx, next);
// };

// const DEFAULTS = {
//     chunkName: 'app',
//     serverRendererOptions: {},
//     createHandler: createConnectHandler,
// };

function interopRequireDefault(obj: any) {
    return obj && obj.__esModule ? obj.default : obj;
}

function findCompiler(multiCompiler: MultiCompiler, name: string): Compiler {
    const compiler = multiCompiler.compilers.find(compiler => compiler.name === name);

    if (!compiler)
        throw new Error(`Can't find '${name}' compiler`);

    return compiler;
}

// function findStats(multiStats, name) {
//     return multiStats.stats.filter(stats => stats.compilation.name.indexOf(name) === 0);
// }

// function getFilename(serverStats, outputPath, chunkName) {
//     const assetsByChunkName = serverStats.toJson().assetsByChunkName;
//     let filename = assetsByChunkName[chunkName] || '';
//     // If source maps are generated `assetsByChunkName.main`
//     // will be an array of filenames.
//     return path.join(
//         outputPath,
//         Array.isArray(filename)
//             ? filename.find(asset => /\.js$/.test(asset))
//             : filename
//     );
// }

function getServerRenderer(filename: string, buffer: Buffer) {
    const errMessage = `The 'server' compiler must export a handler function in the form of \`(req, res, next) => void\``;

    let serverRenderer = interopRequireDefault(
        requireFromString(buffer.toString(), filename)
    );

    if (typeof serverRenderer !== 'function') {
        throw new Error(errMessage);
    }

    return serverRenderer;
}

// function installSourceMapSupport(fs: OutputFileSystem) {
//     sourceMapSupport.install({
//         // NOTE: If https://github.com/evanw/node-source-map-support/pull/149
//         // lands we can be less aggressive and explicitly invalidate the source
//         // map cache when Webpack recompiles.
//         emptyCacheBetweenOperations: true,
//         retrieveFile(source) {
//             try {
//                 return fs.readFileSync(source, 'utf8');
//             } catch (ex) {
//                 // Doesn't exist
//             }
//         }
//     });
// }

/**
 * Passes the request to the most up to date 'server' bundle.
 * NOTE: This must be mounted after webpackDevMiddleware to ensure this
 * middleware doesn't get called until the compilation is complete.
 * @param   {MultiCompiler} multiCompiler                  e.g webpack([clientConfig, serverConfig])
 * @options {String}        options.chunkName              The name of the main server chunk.
 * @options {Object}        options.serverRendererOptions  Options passed to the `serverRenderer`.
 * @return  {Function}                                     Middleware fn.
 */
export default function webpackHotServerMiddleware(multiCompiler: MultiCompiler): RequestHandler {
    console.log('Using webpack-hot-server-middleware');

    // let options = Object.assign({}, DEFAULTS);

    const serverCompiler = findCompiler(multiCompiler, 'server');
    const clientCompilers = findCompiler(multiCompiler, 'client');

    const outputFs = serverCompiler.outputFileSystem as any;
    const outputPath = serverCompiler.outputPath;

    //installSourceMapSupport(outputFs);

    let serverRenderer: RequestHandler;
    let error = false;

    const doneHandler = () => {
        console.log("doneHandler");
        error = false;

        const appModulePath = path.resolve(outputPath, "app.js");
        const ssrModule = path.resolve(outputPath, "ssr.js");

        const appModule = require.resolve(appModulePath);
        if (appModule && require.cache[appModule])
            delete require.cache[appModule];

        const buffer = outputFs.readFileSync(ssrModule);
        try {
            serverRenderer = getServerRenderer(ssrModule, buffer);
        } catch (ex) {
            console.log(ex);
            error = ex;
        }
    };

    multiCompiler.hooks.done.tap('HotSSR', doneHandler);

    // return function (): RequestHandler {
    //     //return serverRenderer;
    //     return createHandler(error, serverRenderer);
    // };

    return (req: any, res: any, next: any) => {
        process.stdout.write(`Receive request ${req.url}\n`);
        if (error) {
            return next(error);
        }
        serverRenderer(req, res, next);
    };
}