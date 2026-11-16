
// JS2 软化水箱液位换算：实际液位(m) / 2.5m * 100% -> 内部变量
// 执行方式：循环 1000ms
var m = ReadFromTag('PLC.SEC192.SEC.软化水水箱液位');
var p = 0;
if (m != '' && m != null) {
  p = parseFloat(m) / 2.5 * 100;
}
if (isNaN(p)) { p = 0; }
if (p < 0) { p = 0; }
if (p > 100) { p = 100; }
WriteToTag('$.水箱液位百分比', p);
