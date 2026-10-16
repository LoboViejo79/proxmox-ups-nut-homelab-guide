#!/bin/sh
set -u

echo "===== UPS ====="
upsc ups-rack@localhost | grep -E 'battery.charge|battery.runtime|input.voltage|output.voltage|ups.load|ups.status' || true

echo
echo "===== SHUTDOWN ====="
grep -E '^(SHUTDOWNCMD|POWERDOWNFLAG)' /etc/nut/upsmon.conf || true

echo
echo "===== TIMER ====="
grep -E 'ONBATT|ONLINE|LOWBATT' /etc/nut/upssched.conf || true

echo
echo "===== UPS NO KILLPOWER ====="
grep 'sdorder' /etc/nut/ups.conf || true

echo
echo "===== SCRIPT ====="
sh -n /usr/local/sbin/nut-upssched-cmd && echo "SCRIPT OK"

echo
echo "===== NUT ====="
systemctl is-active nut-driver@ups-rack.service nut-server nut-monitor || true

echo
echo "===== PROXMOX ====="
systemctl is-enabled pve-guests.service || true
qm list || true
pct list || true
