#!/bin/bash
{
echo "=== SYSTEM ENUMERATION REPORT ==="
echo "Generated: $(date)"
echo
echo "=== SYSTEM INFO ==="
uname -a
cat /etc/os-release
hostname
uptime
echo
echo "=== NETWORK CONFIG ==="
ifconfig -a 2>/dev/null || ip addr show
echo
ip route show
echo
cat /etc/hosts
echo
cat /etc/resolv.conf
echo
echo "=== USERS & GROUPS ==="
id
groups
cat /etc/passwd
echo
cat /etc/group
echo
w
who
last -20
echo
echo "=== SUDO PRIVILEGES ==="
sudo -l
echo
echo "=== SUID BINARIES ==="
find / -perm -4000 -type f 2>/dev/null
echo
echo "=== CAPABILITIES ==="
getcap -r / 2>/dev/null
echo
echo "=== NETWORK SERVICES ==="
netstat -tlnp 2>/dev/null || ss -tlnp
echo
lsof -i -P -n 2>/dev/null | head -20
echo
echo "=== PROCESSES ==="
ps auxf
echo
echo "=== MOUNTED FILESYSTEMS ==="
mount
echo
df -h
echo
cat /proc/mounts
echo
lsblk 2>/dev/null
echo
echo "=== CONTAINER INFO ==="
cat /.dockerenv 2>/dev/null
env | grep -i docker
echo
cat /proc/1/cgroup
echo
cat /proc/self/cgroup
echo
echo "=== DOCKER API INFO ==="
curl -s http://localhost:2375/version 2>/dev/null
echo
curl -s http://localhost:2375/containers/json 2>/dev/null
echo
curl -s http://localhost:2375/info 2>/dev/null
echo
echo "=== WORKSPACE FILES ==="
find /workspace -type f -ls 2>/dev/null
echo
cat /workspace/README.md 2>/dev/null
echo
cat /workspace/test.txt 2>/dev/null
echo
cd /workspace && git log --oneline --all 2>/dev/null
cd /workspace && git remote -v 2>/dev/null
echo
echo "=== SENSITIVE FILES ==="
find /home -type f \( -name "*.txt" -o -name "*.log" -o -name "*.conf" -o -name "*.env" -o -name "*.key" -o -name "*.pem" \) 2>/dev/null | head -30
echo
ls -la ~/.ssh/ 2>/dev/null
echo
ls -la ~/.aws/ 2>/dev/null
echo
cat ~/.bash_history 2>/dev/null | tail -50
echo
echo "=== CRON JOBS ==="
cat /etc/crontab 2>/dev/null
ls -la /etc/cron.* 2>/dev/null
echo
echo "=== WRITABLE FILES ==="
find / -writable -type f 2>/dev/null | grep -v proc | head -30
echo
echo "=== END OF REPORT ==="
} > system_enum_report.txt 2>&1

echo "Report saved to: system_enum_report.txt"
wc -l system_enum_report.txt
