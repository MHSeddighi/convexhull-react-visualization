class ConvexHull {
    length = 0;
    constructor() {

    }

    direction(p, q, r) {
        let d = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
        if (d == 0) return 0; // 0 --> (p,q,r) are collinear
        return (d > 0) ? 1 : 2; // 1 --> Clockwise & 2 --> Counterclockwise
    }

    convexHull(points) {
        const convexHull = [];
        let number = points.length;
        let leftMost = 0;
        for (let i = 1; i < number; i++)
            if (points[i].x < points[leftMost].x)
                leftMost = i;


        let p = leftMost, q;
        do {
            convexHull[convexHull.length] = points[p];
            this.length++;
            q = (p + 1) % number;
            for (let i = 0; i < number; i++) {
                if (this.direction(points[p], points[i], points[q]) == 2)
                    q = i;
            }
            p = q;
        } while (p != leftMost);
        return convexHull;
    }


}

export default ConvexHull;