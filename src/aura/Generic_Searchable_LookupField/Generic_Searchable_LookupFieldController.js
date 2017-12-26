({
    doInit : function(component, event, helper) {
        helper.retrieveRecords(component, event, helper);
    },
    showAllResults : function(component, event, helper) {
        var cmpTarget = component.find('dmslistdiv');
        $A.util.toggleClass(cmpTarget, 'slds-hide');
    },
    handleSearchKeyUp : function(component, event, helper) {
        helper.startSearchDisplay(component, event, helper);
    },
    selectThisDMS : function(component, event, helper) {
        var clickedActivity = event.target.id;
        component.set("v.dmsActivityVal", clickedActivity);
        var cmpTarget = component.find('dmslistdiv');
        $A.util.addClass(cmpTarget, 'slds-hide');
        //event intitale
        var DMSEvent = component.getEvent("DMSActivity");
        DMSEvent.setParams({"ActivityName" : component.get("v.dmsActivityVal")});
        DMSEvent.fire();
    },
    checkForNull : function(component,event,helper){
        var dmsActivity = component.get("v.dmsActivityVal");
        var errfield = component.find("search-input-error");
        if(dmsActivity === '')	{
            errfield.set("v.errors",[{message:"Selezionare un'attività DMS."}]);
            //Do not confirm on parent component if DMS Activity is null
            return false;
        }else
        {
            errfield.set("v.errors",'');
            return true;
        }
    }
})