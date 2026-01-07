#!/bin/bash
# Increase file descriptor limit and run Next.js dev server
ulimit -n 65536
exec npx next dev

