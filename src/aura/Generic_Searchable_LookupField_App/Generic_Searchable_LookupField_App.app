<aura:application extends="force:slds" >
    <c:Generic_Searchable_LookupField fieldlabel="Account Name"
                                      fieldObject="Account"
                                      isRequired="true"
                                      lookupfieldAPI="Type"
                                      backEndFieldAPI="Name"
                                      queryFields="Id"
                                      />
</aura:application>