/*
 * Ext JS Library 2.2
 * Copyright(c) 2006-2008, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

Ext.app.SearchField = Ext.extend(Ext.form.TwinTriggerField, {
    initComponent : function(){
        Ext.app.SearchField.superclass.initComponent.call(this);
        this.on('specialkey', function(f, e){
            if(e.getKey() == e.ENTER){
                this.onTrigger2Click();
            }
        }, this);
    },
	
    validationEvent:false,
    validateOnBlur:false,
    trigger1Class:'x-form-clear-trigger',
    trigger2Class:'x-form-search-trigger',
    hideTrigger1:true,
    width:180,
    hasSearch : false,
    pageSize:20,
    paramFieldName:'queryField',//查询的字段名
    paramName : 'queryValue',//字段名的值，
    combox:{},
    isTime:false,
    startTime:{},
    endTime:{},

    onTrigger1Click : function(){
        if(this.hasSearch){
            this.el.dom.value = '';
            var o = {start: 0,limit:this.pageSize};
            this.store.baseParams = this.store.baseParams || {};
            this.store.baseParams[this.paramFieldName] ='';
            this.store.baseParams[this.paramName] = '';
             this.store.baseParams['startTime'] ='';
            this.store.baseParams['endTime'] = '';
            this.store.reload({params:o});
            this.triggers[0].hide();
            this.hasSearch = false;
            this.startTime.setValue('');
            this.endTime.setValue('');
            this.combox.reset();
        }
    },

    onTrigger2Click : function(){
    	var startTimeStr='' ;
    	var endTimeStr='';
    	if(this.isTime){
    		
    		startTimeStr = Ext.util.Format.date(this.startTime.getValue(), 'Y-m-d');
    		endTimeStr = Ext.util.Format.date(this.endTime.getValue()!=null?this.endTime.getValue():new Date(), 'Y-m-d');
    		
    	}
    	var paramFieldByCombox = this.combox.getValue(); 
        var v = this.getRawValue();
        if(v.length < 1&&startTimeStr==''){
            this.onTrigger1Click();
            return;
        }
        var o = {start: 0,limit:this.pageSize};
        this.store.baseParams = this.store.baseParams || {};
        this.store.baseParams[this.paramFieldName] = paramFieldByCombox;
        this.store.baseParams[this.paramName] = v;
        this.store.baseParams['startTime'] = startTimeStr;
        this.store.baseParams['endTime'] =endTimeStr;
        this.store.reload({params:o});
        this.hasSearch = true;
        this.triggers[0].show();
    }
});

Ext.app.SearchFieldGrid = Ext.extend(Ext.form.TwinTriggerField, {
    initComponent : function(){
        Ext.app.SearchField.superclass.initComponent.call(this);
        this.on('specialkey', function(f, e){
            if(e.getKey() == e.ENTER){
                this.onTrigger2Click();
            }
        }, this);
    },

    validationEvent:false,
    validateOnBlur:false,
    trigger1Class:'x-form-clear-trigger',
    trigger2Class:'x-form-search-trigger',
    hideTrigger1:true,
    width:180,
    hasSearch : false,
    paramFieldName:'',//查询的字段名
    pageSize:20,
    isDefaultValue:false, 
    defaultValue:'',//默认值
    onTrigger1Click : function(){
        if(this.hasSearch){
        	if(this.isDefaultValue)
            	this.el.dom.value = this.defaultValue;
            else
            	this.el.dom.value = '';
            var o = {start: 0,limit:this.pageSize};
            this.store.baseParams = this.store.baseParams || {};
            this.store.baseParams[this.paramFieldName] ='';
            this.store.reload({params:o});
            this.triggers[0].hide();
            this.hasSearch = false;
        }
    },

    onTrigger2Click : function(){  
        var v = this.getRawValue();
        if(v.length==0||v.length < this.minLength){
            this.onTrigger1Click();   
            return;
        }
        var o = {start: 0,limit:this.pageSize};
        this.store.baseParams = this.store.baseParams || {};
        this.store.baseParams[this.paramFieldName] = v;
        this.store.reload({params:o});
        this.hasSearch = true;
        this.triggers[0].show();
    }
});