#!/bin/sh
# EJEMPLO PUBLICO ANONIMIZADO Y SINTACTICAMENTE VALIDO.
# Proxmox apaga los guests en orden inverso al startup order.
# Define estas variables con los IDs REALES de tu laboratorio antes de ejecutar.

: "${VMID_NAS:?Define VMID_NAS, por ejemplo: VMID_NAS=100}"
: "${CTID_SERVICIO_1:?Define CTID_SERVICIO_1}"
: "${CTID_SERVICIO_2:?Define CTID_SERVICIO_2}"
: "${CTID_SERVICIO_3:?Define CTID_SERVICIO_3}"
: "${CTID_SERVICIO_4:?Define CTID_SERVICIO_4}"
: "${CTID_SERVICIO_5:?Define CTID_SERVICIO_5}"
: "${CTID_SERVICIO_6:?Define CTID_SERVICIO_6}"

qm set "$VMID_NAS" -startup order=10,up=90,down=180
pct set "$CTID_SERVICIO_1" -startup order=20,up=5,down=60
pct set "$CTID_SERVICIO_2" -startup order=30,up=5,down=60
pct set "$CTID_SERVICIO_3" -startup order=40,up=5,down=60
pct set "$CTID_SERVICIO_4" -startup order=50,up=5,down=60
pct set "$CTID_SERVICIO_5" -startup order=60,up=5,down=60
pct set "$CTID_SERVICIO_6" -startup order=70,up=5,down=60
