module.exports = (function () {
    try {
        return !(window !== undefined)
    } catch (e) {
        return true;
    }
})();