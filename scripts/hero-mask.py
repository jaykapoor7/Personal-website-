# Cuts me out of the hero photo (OpenCV GrabCut, seeded with my rough shape),
# so the name can pass behind me. Writes scripts/hero-mask.png; then run
# `node scripts/make-hero.mjs`. Needs: pip install opencv-python-headless numpy
import cv2, numpy as np
src = cv2.imread('public/photos/pitt_portrait-1280.webp')
h, w = src.shape[:2]
mask = np.full((h, w), cv2.GC_BGD, np.uint8)
# probable foreground: a box around me
x0, y0, x1, y1 = 300, 600, 760, h
mask[y0:y1, x0:x1] = cv2.GC_PR_BGD
# person-shaped probable fg: head ellipse + torso trapezoid
cv2.ellipse(mask, (505, 735), (105, 125), 0, 0, 360, cv2.GC_PR_FGD, -1)
pts = np.array([[340, h], [370, 880], [450, 830], [570, 830], [660, 880], [735, h]], np.int32)
cv2.fillPoly(mask, [pts], cv2.GC_PR_FGD)
# sure foreground seeds: face, shirt, jacket
cv2.ellipse(mask, (505, 760), (55, 70), 0, 0, 360, cv2.GC_FGD, -1)
cv2.rectangle(mask, (470, 880), (545, h - 5), cv2.GC_FGD, -1)
cv2.rectangle(mask, (400, 1000), (450, h - 5), cv2.GC_FGD, -1)
cv2.rectangle(mask, (590, 1000), (660, h - 5), cv2.GC_FGD, -1)
bgd = np.zeros((1, 65), np.float64); fgd = np.zeros((1, 65), np.float64)
cv2.grabCut(src, mask, None, bgd, fgd, 8, cv2.GC_INIT_WITH_MASK)
m = np.where((mask == cv2.GC_FGD) | (mask == cv2.GC_PR_FGD), 255, 0).astype(np.uint8)
# keep the largest component, close holes
n, lab, stats, _ = cv2.connectedComponentsWithStats(m)
big = 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA])
m = np.where(lab == big, 255, 0).astype(np.uint8)
m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, np.ones((9, 9), np.uint8))
cnts, _ = cv2.findContours(m, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
m2 = np.zeros_like(m); cv2.drawContours(m2, cnts, -1, 255, -1)
m = cv2.GaussianBlur(m2, (5, 5), 0)
cv2.imwrite('scripts/hero-mask.png', m)
