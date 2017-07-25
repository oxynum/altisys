
(function (app) {
    'use strict';

    app.factory('cookieService', function ($rootScope, $cookies) {
        return {
            set:function(name, value)
            {
                this.set$expireDate(name, value, null)
            },
            set$expireDate: function (name, value, expireDate) {
                var stringValue = undefined;
                if (value && typeof value !== 'string')
                    stringValue = JSON.stringify(value);
                else
                    stringValue = value;
                if (stringValue !== undefined)
                {
                    var encryptedMessage = sjcl.encrypt("myPassword", stringValue);
                    if (expireDate)
                        $cookies.put(name, encryptedMessage, { 'expires': expireDate });
                    else
                        $cookies.put(name, encryptedMessage);
                }
            },
            get: function (name) {
                //console.log('cookieService:get:' + name);
                var decryptedMessage = undefined;
                //Decrypt JS remove
                var encryptedMessage = $cookies.get(name);
                if (encryptedMessage && encryptedMessage != '') {
                    try
                    {
                        var o = undefined;
                        decryptedMessage = sjcl.decrypt("myPassword", encryptedMessage); //TODO PASSWORD
                        if (decryptedMessage && (decryptedMessage.indexOf('{') != -1 && decryptedMessage.indexOf('}') != -1) || (decryptedMessage.indexOf('[') != -1 && decryptedMessage.indexOf(']') != -1))
                            o = (new Function("return " + decryptedMessage + ";"))();
                        return o !== undefined ? o : decryptedMessage;
                    }
                    catch(e)
                    {
                        console.log('decrypt error::' + name);
                    }
                }
                return decryptedMessage;
            },
            remove: function (name) {
                $cookies.remove(name);
            },

            //Business Altisys
            //removeItem: function (name, item) {
            //    var itemToAdd = {};
            //    if (item && typeof item !== 'object')
            //        itemToAdd = (new Function("return " + item + ";"))();
            //    else
            //        itemToAdd = item;
            //    var items = (new Function("return " + this.get(name) + ";"))();
            //    for (var i = 0; i < items.length; i++) {
            //        alert(JSON.stringify(items[i]))
            //        alert(JSON.stringify(item))
            //        if (items[i] === itemToAdd) {
            //            return this.removeItemAt(name, i);
            //        }
            //    }
            //    return items;
            //},
            removeItem: function (name, item) {
                var newItem = '';
                if (item && typeof item !== "object")
                    newItem = (new Function("return " + item + ";"))();
                else
                    newItem = item;
                var oList = this.get(name);
                if (oList) {
                    var index = oList.indexOf(newItem);
                    if (index != '-1')
                        oList.splice(index, 1);
                }
                this.set(name, JSON.stringify(oList));
            },
            removeItemAt: function (name, index) {
                var items = this.get(name);
                items.splice(index, 1);
                this.set(name, JSON.stringify(items));

                return items;
            },
            addItemFIFO: function (name, item) {
                if (!this.get(name + '-max'))
                    this.set(name + '-max', '10');
                var max = parseInt(this.get(name + '-max'));
                var newItem = '';
                if (item && typeof item !== "object")
                    newItem = (new Function("return " + item + ";"))();
                else
                    newItem = item;
                var oList = this.get(name);
                if (!oList)
                    oList = [];
                
                oList.push(newItem);
                if (oList.length > max)
                    oList.pop();
                
                this.set(name, JSON.stringify(oList));
            },
            newFIFO: function (name, max, arrItems) {
                var data = '';
                var limit = '';
                if (max && typeof max === "number")
                    limit = max.toString();
                else
                    limit = max;
                if (arrItems && typeof arrItems !== "string")
                    data = JSON.stringify(arrItems);
                else
                    data = arrItems;

                this.set(name, data);
                this.set(name + '-max', limit);
            },
            defineMaxFIFO: function (name, max) {
                if (this.get(name))
                    this.set(name + '-max', max);
            }
        }
    });

})(angular.module('appMain'));
