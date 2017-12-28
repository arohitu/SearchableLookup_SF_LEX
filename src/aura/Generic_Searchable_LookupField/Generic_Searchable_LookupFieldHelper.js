({
    retrieveRecords: function(component, event, helper) {
        var action = component.get("c.retrieveRecords");
        action.setParams({
            qfields: component.get("v.queryFields"),
            qObject: component.get("v.fieldObject"),
            qWhereCond: component.get("v.wherecondition"),
            lookupField: component.get("v.lookupfieldAPI")

        });
        action.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") {
                var retrievedRecs = response.getReturnValue();
                var finalLookupList = [];
                var lookupFieldList = [];
                lookupFieldList.push(component.get("v.lookupfieldAPI"));
                for (var i = 0; i < retrievedRecs.length; i++) {
                    for (var ii = 0; ii < lookupFieldList.length; ii++) {
                        finalLookupList.push(retrievedRecs[i][lookupFieldList[ii]]);
                    }
                }
                component.set("v.retrievedRecords", finalLookupList);
            } else if (response.getState() === "ERROR") {
                $A.log("Errors", response.getError());
            }
        });
        $A.enqueueAction(action);
    },
    startSearchDisplay: function(component, event, helper) {
        var currentVal, filter, ul, li, a;
        var itemCheck = false;
        currentVal = component.get("v.fieldSelectedVal").toUpperCase();
        ul = document.getElementById("recsUL");
        li = ul.getElementsByTagName('li');
        var falseCount = 0;
        // Loop through all list items, and hide those who don't match the search query
        for (var i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            if (a.innerHTML.indexOf(currentVal) > -1) {
                li[i].style.display = "";
                itemCheck = true;
            } 
            else {
                falseCount++;
                li[i].style.display = "none";
            }
        }
        console.log('To Hide Items>: '+falseCount);
        if (itemCheck === true && currentVal !== '') {
            $A.util.removeClass(component.find('recslistdiv'), 'slds-hide');
        }
    }
})