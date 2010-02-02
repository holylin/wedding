Ext.namespace("Ext.ux.form");
Ext.ux.form.SimpleCheckBoxGroup = Ext.extend(Ext.form.CheckboxGroup,{
	structure:'',  //[{boxLabel:'来店',inputValue:'S'},{boxLabel:'行业开拓',inputValue:'D'}]
	name:'',     //表示radio 的name
	anchor: '100%',
	xtype: 'radiogroup',
	initComponent:function(){
		if(this.structure!=''){
		 this.initStructure();
		}
		Ext.ux.form.SimpleCheckBoxGroup.superclass.initComponent.call(this);
	},
	initStructure:function(){
		var arr = new Array();
		if(this.structure!=null){
		  for(var i=0;i<this.structure.length;i++){
		  	 var r =this.structure[i];
		  	 arr[arr.length]={
		  	 		boxLabel:r.boxLabel,
		  	 		name:this.name,
		  	 		inputValue:r.inputValue,
		  	 		checked:(r.checked == undefined || !r.checked)?false:true	  	 		
		  	 };
		  }
		}
		this.items = arr;
	}
});
Ext.ux.form.SimpleRadioGroup = Ext.extend(Ext.form.RadioGroup,{
	structure:'',  //[{boxLabel:'来店',inputValue:'S'},{boxLabel:'行业开拓',inputValue:'D'}]
	name:'',     //表示radio 的name
	anchor: '100%',
	xtype: 'radiogroup',
	initComponent:function(){
		if(this.structure!=''){
		 this.initStructure();
		}
		Ext.ux.form.SimpleRadioGroup.superclass.initComponent.call(this);
	},
	initStructure:function(){
		var arr = new Array();
		if(this.structure!=null){
		  for(var i=0;i<this.structure.length;i++){
		  	 var r =this.structure[i];
		  	 arr[arr.length]={
		  	 		boxLabel:r.boxLabel,
		  	 		name:this.name,
		  	 		inputValue:r.inputValue,
		  	 		checked:(r.checked == undefined || !r.checked)?false:true	  	 		
		  	 };
		  }
		}
		this.items = arr;
	}
});
//2009-03-05
Ext.ux.form.RemoteCheckboxGroup = Ext.extend(Ext.form.CheckboxGroup, 
{
  baseParams: null,
  url: '',
  name: '',
  values:'',//已经check的
  defaultItems: 
  [
    {
      boxLabel: 'no options',
      disabled: true
    }
  ],
  fieldId: 'id',
  fieldName: 'name',
  fieldLabel: 'boxLabel',
  fieldValue: 'inputValue',
  fieldChecked: 'checked',
  reader: null,
  //fieldClass: 'temp',
  //vertical : false,  

  onRender: function(H, F)
  {
  	this.items = [];//
    //this.items = this.defaultItems;
    if ((this.url != '') && (this.reader != null))
    {
      var conn = Ext.lib.Ajax.getConnectionObject().conn;
      conn.open("POST", this.url, false);
      conn.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      conn.send(Ext.urlEncode(this.baseParams) || null);
      var response = Ext.decode(conn.responseText);
      //alert(response.success);
      if (response.success) 
      {
        var data = this.reader.readRecords(Ext.decode(conn.responseText));
        var item;
        var record;
        var id, name, checked,ckbValue;
        //alert(data.records.length);
        for (var i = 0; i < data.records.length; i++) 
        {
          record = data.records[i];
          ckbValue = record.get(this.fieldValue)+"_"+record.get(this.fieldLabel);
          item = 
          {
            boxLabel: record.get(this.fieldLabel),
            inputValue: ckbValue
          } 
		 
          //Ext.ux.form.RemoteCheckboxGroup.superclass.initComponent.call(this);*/
          
          if (this.fieldId != '')
          {
            item.id = record.get(this.fieldId);
          }
          
          /*if (this.fieldName != '')
          {
            item.name = record.get(this.fieldName);
          }
          */
          /*if (this.fieldChecked != '')
          {
            item.checked = record.get(this.fieldChecked);
          }*/
          if(this.values.indexOf(ckbValue)>-1){
          	item.checked = true;
          }
          item.name = this.name;
          this.items[i] = item;
        }
      }
    }
    Ext.ux.form.RemoteCheckboxGroup.superclass.onRender.call(this, H, F)
  }
});
Ext.reg("remotecheckboxgroup", Ext.ux.form.RemoteCheckboxGroup);
