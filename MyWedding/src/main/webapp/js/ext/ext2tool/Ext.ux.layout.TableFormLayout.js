Ext.namespace('Ext.ux.layout');
Ext.ux.layout.TableFormLayout = Ext.extend(Ext.layout.TableLayout, {
			renderAll : function(ct, target) {
				var items = ct.items.items;
				for (var i = 0, len = items.length; i < len; i++) {
					var c = items[0]; // use 0 index because the array shrinks
					// by one after each call to
					// renderItem()
					if (c && (!c.rendered || !this.isValidParent(c, target))) {
						this.renderItem(c, i, target);
					}
				}
			},

			renderItem : function(c, position, target) {
				if (c && !c.rendered) {
					var td = this.getNextCell(c);
					var p = new Ext.Panel(Ext.apply(this.container.formConfig,
							{
								layout : 'form', // this is the tableform
								// layout so force each cell
								// panel to have a form
								// layout
								items : c,
								renderTo : td
							}));
				}
			}
		});
Ext.Container.LAYOUTS['tableform'] = Ext.ux.layout.TableFormLayout;
/*Ext.reg('tableform', Ext.ux.layout.TableFormLayout);		*/