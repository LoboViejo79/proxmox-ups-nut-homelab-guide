# Resumen de implementación

Flujo: USB HID → `usbhid-ups` → `upsd` → `upsmon` → `upssched` → `nut-upssched-cmd` → FSD → `pve-guests` → `systemctl poweroff`.

Política: 180 s en batería, cancelación con ONLINE, FSD inmediato en LOWBATT y sin killpower a la UPS.
