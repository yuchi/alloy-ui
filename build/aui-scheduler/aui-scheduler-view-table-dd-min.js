AUI.add("aui-scheduler-view-table-dd",function(j){var S=j.Lang,G=S.isObject,f=j.DataType.DateMath,K=f.WEEK_LENGTH,p=".",F="scheduler-event",z="scheduler-view",M="boundingBox",C="col",g="colgrid",H="content",h="data",b="dd",i="delegate",w="delegateConfig",y="disabled",B="displayDaysInterval",e="dragNode",c="dragging",l="draggingEvent",E="eventRecorder",m="lasso",P="node",I="offsetHeight",J="offsetWidth",R="proxy",L="proxyNode",u="region",r="rowsContainerNode",s="scheduler",N="startDate",t="table",Q="visible",d=j.getClassName,q=d(F),O=d(F,y),o=d(z,t,g),x=d(z,t,c),k=d(z,t,m),a=d(z,t,R,P),D=d(z,t,h,C),v='<div class="'+k+'"></div>',n='<div class="'+a+'"></div>';j.SchedulerTableViewDD=function(){};j.SchedulerTableViewDD.ATTRS={delegateConfig:{value:{},setter:function(T){var A=this;return j.merge({dragConfig:{offsetNode:false,useShim:false},bubbleTargets:A,container:A.get(M),nodes:p+q,invalid:"input, select, button, a, textarea, "+p+O},T||{});},validator:G}};j.mix(j.SchedulerTableViewDD.prototype,{initializer:function(){var A=this;A[L]=j.Node.create(n);A.after(A.viewDDBindUI,A,"bindUI");A.after(A.viewDDRenderUI,A,"renderUI");A.after(A.viewDDSyncUI,A,"syncUI");},viewDDBindUI:function(){var A=this;var T=A.get(s).get(E);if(T){T.on({cancel:j.bind(A.removeLasso,A),save:j.bind(A.removeLasso,A)});}A[r].on({mousedown:j.bind(A._onMouseDownGrid,A),mousemove:j.bind(A._onMouseMoveGrid,A),mouseup:j.bind(A._onMouseUpGrid,A)});A.after("drag:align",A._afterDragAlign);A.on("drag:end",A._onEventDragEnd);A.on("drag:start",A._onEventDragStart);},viewDDRenderUI:function(){var A=this;},viewDDSyncUI:function(){var A=this;A._setupDragDrop();},removeLasso:function(){var A=this;if(A[m]){A[m].remove();}},removeProxy:function(){var A=this;if(A[L]){A[L].remove();}},renderLasso:function(Z,T){var af=this;var W=Z;var Y=T;if(Z[1]>T[1]){W=T;Y=Z;}var ag=W[0],ab=W[1],U=Y[0],A=Y[1],V;af.removeLasso();af.lasso=j.NodeList.create();for(V=ab;V<=A;V++){var X=af.gridCellHeight,ae=af.gridCellWidth,ac=0,aa=(X*V);if(V===ab){if(ab===A){ac+=Math.min(ag,U)*ae;ae*=Math.abs(U-ag)+1;}else{ac+=ag*ae;ae*=K-ag;}}else{if(V===A){ae*=U+1;}else{ae*=K;}}var ad=j.Node.create(v);af.lasso.push(ad);af[r].append(ad);ad.sizeTo(ae,X);ad.setXY(af._offsetXY([ac,aa],1));}},_afterDragAlign:function(A){var Z=this;var aa=A.target;var W=Z.bodyNode.get(u);var X={bottom:A.pageY,left:A.pageX,right:A.pageX,top:A.pageY};if(!j.DOM.inRegion(null,W,true,X)){return;}var Y=Z[l];var T=[A.pageX,A.pageY];var V=Z._findPosition(Z._offsetXY(T,-1));if(Y&&Z._hasLassoChanged(V)){Z.lassoLastPosition=V;var U=f.add(Z._getPositionDate(V),f.MINUTES,Y.getMinutesDuration());Z.renderLasso(V,Z._getDatePosition(U));}},_findPosition:function(V){var A=this;var U=Math.floor(V[0]/A.gridCellWidth);var T=Math.floor(V[1]/A.gridCellHeight);return[U,T];},_getDatePosition:function(U){var T=this;var V=T._findCurrentIntervalStart();var W=f.getDayOffset(U,V);var A=[];A[1]=Math.floor(W/K);A[0]=W%K;return A;},_getPositionDate:function(U){var T=this;var W=T._findCurrentIntervalStart();var A=f.safeClearTime(T._findFirstDayOfWeek(W));var V=f.add(A,f.DAY,T._getCellIndex(U));V.setHours(0,0,0,0);return V;},_hasLassoChanged:function(T){var A=this;var U=A.lassoLastPosition||A.lassoStartPosition;return U&&((T[0]!==U[0])||(T[1]!==U[1]));},_offsetXY:function(V,U){var A=this;var T=A[r].getXY();return[V[0]+T[0]*U,V[1]+T[1]*U];},_onEventDragEnd:function(T){var A=this;var V=A[l];if(V){var U=A._getPositionDate(A.lassoLastPosition);f.copyHours(U,V.get(N));V.move(U);V.set(Q,true,{silent:true});A[r].removeClass(x).unselectable();T.target.set(e,A.originalDragNode);A.removeLasso();A.removeProxy();A.get(s).syncEventsUI();}A[l]=null;},_onEventDragStart:function(W){var A=this;var X=A[l]=A[i][b].get(P).getData(F);if(X){A._syncCellDimensions();var U=[W.pageX,W.pageY];var V=A._findPosition(A._offsetXY(U,-1));var T=f.add(A._getPositionDate(V),f.MINUTES,X.getMinutesDuration());A.renderLasso(V,A._getDatePosition(T));A._syncProxyNodeUI(X);X.set(Q,false,{silent:true});A.lassoStartPosition=A.lassoLastPosition=V;A[r].addClass(x).unselectable();A.originalDragNode=W.target.get(e);W.target.set(e,A[L]);}},_onMouseDownGrid:function(W){var A=this;var V=A.get(s);var U=V.get(E);var X=W.target;if(U&&X.test([p+o,p+D].join())){A._recording=true;A._syncCellDimensions();var T=A._offsetXY([W.pageX,W.pageY],-1);A.lassoStartPosition=A.lassoLastPosition=A._findPosition(T);A.renderLasso(A.lassoStartPosition,A.lassoLastPosition);A[r].unselectable();}},_onMouseMoveGrid:function(V){var T=this;var W=V.currentTarget;var U=[V.pageX,V.pageY];var A=T._findPosition(T._offsetXY(U,-1));if(T._recording&&T._hasLassoChanged(A)){T.lassoLastPosition=A;T.renderLasso(T.lassoStartPosition,A);}},_onMouseUpGrid:function(Y){var T=this;var X=T.get(s);var V=X.get(E);if(V&&T._recording&&!X.get(y)){var W=T._getPositionDate(T.lassoStartPosition);var U=T._getPositionDate(T.lassoLastPosition);var A=new Date(Math.min(W,U));A.setHours(0,0,0);var Z=new Date(Math.max(W,U));Z.setHours(23,59,59);V.setAttrs({allDay:true,endDate:Z,startDate:A},{silent:true});V.showOverlay([Y.pageX,Y.pageY]);T._recording=false;}},_setupDragDrop:function(){var T=this;if(!T[i]){T[i]=new j.DD.Delegate(T.get(w));}var A=T[i][b];A.unplug(j.Plugin.DDNodeScroll);A.unplug(j.Plugin.DDProxy);A.plug(j.Plugin.DDNodeScroll,{node:T.bodyNode,scrollDelay:150});A.plug(j.Plugin.DDProxy,{moveOnEnd:false,positionProxy:false});},_syncCellDimensions:function(){var A=this;var U=A.get(B);var T=Math.ceil(U/K);var V=Math.min(U,K);A.gridCellHeight=A[r].get(I)/T;A.gridCellWidth=A[r].get(J)/V;},_syncProxyNodeUI:function(T){var A=this;var V=T.get(P).item(0);var W=T.get(P).item(1);A[L].setStyles({backgroundColor:V.getStyle("backgroundColor"),display:"block"});if(!W||!W.test(":visible")){var U=V.get(J);A[L].set(J,U);}A[L].appendTo(A[r]);A[L].setContent(T.get(H));}});j.Base.mix(j.SchedulerTableView,[j.SchedulerTableViewDD]);},"@VERSION@",{requires:["aui-scheduler-view-table","dd-drag","dd-delegate","dd-drop"],skinnable:false});