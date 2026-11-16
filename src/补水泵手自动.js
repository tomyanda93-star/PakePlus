
// JS1 补水泵手自动群控（循环 1000ms + 上次值比较）
// 主控 $.补水泵手自动 = 1 自动 / 0 手动；值变化时才把 4 台补水泵一起下发，
// 这样既不每秒重复写 PLC、也不会覆盖现场对单台的单独操作。
var v = ReadFromTag('$.补水泵手自动');
var t = -1;
if (v == 1 || v == '1') { t = 1; }
if (v == 0 || v == '0') { t = 0; }
var last = ReadFromTag('$.补水泵手自动上次');
var need = false;
if (t >= 0) {
  if (last == '' || last == null) { need = true; }
  else if (last != t) { need = true; }
}
if (need) {
  var arrTag = new Array();
  arrTag[0] = 'PLC.SEC192.SEC.1号地暖补水泵手自动控制';
  arrTag[1] = 'PLC.SEC192.SEC.2号地暖补水泵手自动控制';
  arrTag[2] = 'PLC.SEC192.SEC.1号散热器补水泵手自动控制';
  arrTag[3] = 'PLC.SEC192.SEC.2号散热器补水泵手自动控制';
  var arrVal = new Array();
  arrVal[0] = t;
  arrVal[1] = t;
  arrVal[2] = t;
  arrVal[3] = t;
  WriteToTag(arrTag, arrVal);
  WriteToTag('$.补水泵手自动上次', t);
}
