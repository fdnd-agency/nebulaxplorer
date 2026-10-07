import sys,time
from OCP.STEPCAFControl import STEPCAFControl_Reader
from OCP.TDocStd import TDocStd_Document
from OCP.TCollection import TCollection_ExtendedString,TCollection_AsciiString
from OCP.XCAFDoc import XCAFDoc_DocumentTool
from OCP.TDF import TDF_LabelSequence
from OCP.BRepMesh import BRepMesh_IncrementalMesh
from OCP.RWGltf import RWGltf_CafWriter
from OCP.TColStd import TColStd_IndexedDataMapOfStringString
from OCP.Message import Message_ProgressRange
p,out=sys.argv[1:3]
doc=TDocStd_Document(TCollection_ExtendedString('BinXCAF'))
r=STEPCAFControl_Reader();r.SetColorMode(True);r.SetNameMode(True);r.SetMatMode(True)
print('Reading',p,flush=True);print(r.ReadFile(p),flush=True)
assert r.Transfer(doc)
st=XCAFDoc_DocumentTool.ShapeTool_s(doc.Main());roots=TDF_LabelSequence();st.GetFreeShapes(roots)
print('Meshing roots',roots.Length(),flush=True)
for i in range(1,roots.Length()+1):
 shape=st.GetShape_s(roots.Value(i));BRepMesh_IncrementalMesh(shape,0.8,False,0.45,True)
w=RWGltf_CafWriter(TCollection_AsciiString(out),True)
w.SetMergeFaces(True)
assert w.Perform(doc,TColStd_IndexedDataMapOfStringString(),Message_ProgressRange())
print('Wrote',out,flush=True)
