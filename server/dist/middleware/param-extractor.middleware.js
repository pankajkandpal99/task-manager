"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramExtractorMiddleware = void 0;
const paramExtractorMiddleware = () => {
    return (req, res, next) => {
        var _a;
        if (Object.keys(req.params).length === 0 && req.originalUrl.includes("/")) {
            const routePattern = (_a = req.route) === null || _a === void 0 ? void 0 : _a.path;
            if (routePattern && routePattern.includes(":")) {
                const patternSegments = routePattern.split("/").filter(Boolean);
                const urlSegments = req.originalUrl.split("/").filter(Boolean);
                const apiPrefixCount = req.baseUrl.split("/").filter(Boolean).length;
                const relevantUrlSegments = urlSegments.slice(apiPrefixCount);
                patternSegments.forEach((segment, index) => {
                    if (segment.startsWith(":") && relevantUrlSegments[index]) {
                        const paramName = segment.substring(1);
                        req.params[paramName] = relevantUrlSegments[index];
                    }
                });
            }
            else {
                const pathSegments = req.originalUrl.split("/");
                const lastSegment = pathSegments[pathSegments.length - 1];
                if (/^[a-f0-9]{24}$/i.test(lastSegment)) {
                    req.params.id = lastSegment;
                }
            }
        }
        if (req.context && Object.keys(req.params).length > 0) {
            req.context.params = Object.assign(Object.assign({}, req.context.params), req.params);
        }
        next();
    };
};
exports.paramExtractorMiddleware = paramExtractorMiddleware;
//# sourceMappingURL=param-extractor.middleware.js.map