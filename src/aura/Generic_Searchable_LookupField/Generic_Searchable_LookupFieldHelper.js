({
    retrieveRecords : function(component, event, helper) {
        var action = component.get("c.retrieveRecords");
        action.setParams({
            qfields : component.get("v.queryFields"),
            qObject : component.get("v.fieldObject"),
            qWhereCond : component.get("v.wherecondition"),
            lookupField : component.get("v.lookupfieldAPI")
            
        });
        action.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") {
                component.set("v.retrievedRecords", response.getReturnValue());
            } 
            else if (response.getState() === "ERROR") {
                $A.log("Errors", response.getError());
            }
        });
        $A.enqueueAction(action);
    },
    startSearchDisplay : function(component, event, helper) {
        var currentVal, filter, ul, li, a;
        var itemCheck = false;
        currentVal = component.get("v.fieldSelectedVal").toUpperCase();
        //filter = currentVal.toUpperCase();
        ul = document.getElementById("recsUL");
        li = ul.getElementsByTagName('li');
        // Loop through all list items, and hide those who don't match the search query
        for (var i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            if (a.innerHTML.indexOf(currentVal) > -1) {
                li[i].style.display = "";
                itemCheck = true;
            } else {
                li[i].style.display = "none";
            }
        }
        if(itemCheck === true && currentVal !== ''){
            $A.util.removeClass(component.find('recslistdiv'), 'slds-hide');
        }
    }
})