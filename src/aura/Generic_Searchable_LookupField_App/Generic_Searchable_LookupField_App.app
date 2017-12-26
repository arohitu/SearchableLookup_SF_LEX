<aura:application extends="force:slds" >
    <c:Generic_Searchable_LookupField fieldlabel="Account Name"
                                      fieldObject="Account"
                                      isRequired="true"
                                      lookupfieldAPI="Name"
                                      queryFields="Id,Name,Type"/>
</aura:application>