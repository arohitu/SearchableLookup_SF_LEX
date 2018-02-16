({
    retrieveRecords: function(component, event, helper) {
        var showList;// = new Object();
        var action = component.get("c.retrieveRecords");
        action.setParams({
            qfields: component.get("v.queryFields"),
            qObject: component.get("v.fieldObject"),
            qWhereCond: component.get("v.wherecondition"),
            lookupField: component.get("v.lookupfieldAPI"),
            backEndField: component.get("v.backEndFieldAPI")

        });
        action.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") {
                var retrievedRecs = response.getReturnValue();
                var finalLookupList = [];
                for (var i = 0; i < retrievedRecs.length; i++) {
                    if(retrievedRecs[i].hasError){
                        showList = {};
                        component.set("v.showError",true)
                        showList.displayName = retrievedRecs[i].myExceptionMessage;
                        finalLookupList.push(showList);
                    }
                    else {
                        showList = {};
                        showList.sfId = retrievedRecs[i].mysObj[component.get("v.backEndFieldAPI")];
                        showList.displayName = retrievedRecs[i].mysObj[component.get("v.lookupfieldAPI")];
                        finalLookupList.push(showList);
                    }
                }
                component.set("v.retrievedRecords", finalLookupList);
            } 
            else if (response.getState() === "ERROR") {
                $A.log("Errors", response.getError());
            }
        });
        $A.enqueueAction(action);
    },
    startSearchDisplay: function(component, event, helper) {
        var currentVal, filter, ul, li, a;
        var itemCheck = false;
        currentVal = component.get("v.fieldSelectedVal").toUpperCase();
        filter=component.get("v.retrievedRecords");
        ul = document.getElementById("recsUL");
        li = ul.getElementsByTagName('li');
        var falseCount = 0;
        // Loop through all list items, and hide those who don't match the search query
        for (var i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName('a')[0];
            if (a.innerHTML.toUpperCase().indexOf(currentVal)>-1) {
                li[i].style.display = "";
                itemCheck = true;   
            } 
            else {
                falseCount++;
                li[i].style.display = "none";                 
            }
        }
        if (itemCheck === true && currentVal !== '') {
            $A.util.removeClass(component.find('recslistdiv'), 'slds-hide');
        }
        else if (currentVal === '' || itemCheck === false){
            $A.util.addClass(component.find('recslistdiv'), 'slds-hide');
        }
    }
})