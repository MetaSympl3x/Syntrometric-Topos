/**
 * ============================================================================
 * OPERADIC NEURAL TOPOS ENGINE (v2.2.0 - Cortical Abstraction Edition)
 * ============================================================================
 * Standalone Reference Implementation of the 5-Tier Cortical Feature Abstraction
 * and Predictive Coding Architecture formalized in "Syntrometric-Topos.tex".
 *
 * Core Neuro-Mathematical Architecture:
 *  - Tier 0: 2D Retinal Visual Transduction (16x16 Pixel Grid -> Spatial Receptors)
 *  - Tier 1: Unimodal Cortical Columns & Tripartite Context Stalks
 *            (V1 Horizontal, Vertical, Diagonal, and Circle/Surround Receptive Fields
 *            with Predicate Bands [a, f, b], Diatrope Nuances [alpha, d, beta],
 *            and Cech Consensus Descent via discrete Laplacian relaxation)
 *  - Tier 2: Operadic Feature Abstraction (Episyllogismus coinvariant quotient on
 *            Sym^2(F_gamma) actively annihilating alternating phase/position syntax
 *            Lambda^2(F_gamma), coupled with Beck's Distributive Law T_frag o T_pyr,
 *            and Carrier Pushout junction binding)
 *  - Tier 3: Invariant Association Cortex Prototypes (IT / STG Attractor Tokens:
 *            Horizontal Line, Vertical Line, Diagonal Stroke, Circle/Loop, Cross/Junction, Complex Gestalt)
 *  - Tier 4: Cortical Abstraction Workspace & Predictive Coding Core
 *            (32D Recurrent population dynamics integrated via 2-stage Symplectic
 *            Velocity-Verlet with dendritic Christoffel drag, 36-component Hermetry
 *            metric tensor, and top-down predictive reconstruction minimizing prediction error)
 *
 * Zero external dependencies. Standalone UMD module (Node.js, Browser, Worker).
 * ============================================================================
 */

(function (root, factory) {
  const exported = factory();
  if (typeof define === 'function' && define.amd) {
    define([], function () { return exported; });
  } else if (typeof module === 'object' && module.exports) {
    module.exports = exported;
  }
  if (root) {
    root.OperadicNeuralTopos = exported;
  }
}(typeof globalThis !== 'undefined' ? globalThis : (typeof self !== 'undefined' ? self : this), function () {
  'use strict';

  // ==========================================================================
  // 1. BANACH SPACE FOUNDATIONS (FinBan_<=1) & RECEPTIVE FIELD GEOMETRY
  // ==========================================================================
  class BanachSpace {
    constructor(name, dim, pNorm = 2) {
      this.name = name || 'V';
      this.dim = Math.max(1, dim | 0);
      this.pNorm = pNorm;
    }

    norm(x, p = this.pNorm) {
      if (!x || x.length === 0) return 0;
      if (p === 'inf' || p === Infinity) {
        let max = 0;
        for (let i = 0; i < x.length; i++) {
          const abs = Math.abs(x[i]);
          if (abs > max) max = abs;
        }
        return max;
      }
      if (p === 1) {
        let sum = 0;
        for (let i = 0; i < x.length; i++) sum += Math.abs(x[i]);
        return sum;
      }
      if (p === 2) {
        let sumSq = 0;
        for (let i = 0; i < x.length; i++) sumSq += x[i] * x[i];
        return Math.sqrt(sumSq);
      }
      let sumP = 0;
      for (let i = 0; i < x.length; i++) sumP += Math.pow(Math.abs(x[i]), p);
      return Math.pow(sumP, 1 / p);
    }

    normalize(x, p = this.pNorm) {
      const n = this.norm(x, p);
      if (n <= 1e-12) return new Float64Array(x.length);
      const out = new Float64Array(x.length);
      const inv = 1 / n;
      for (let i = 0; i < x.length; i++) out[i] = x[i] * inv;
      return out;
    }

    generateUnitSphereGeometry(subdivisions = 32, p = this.pNorm) {
      const vertices = [];
      const normals = [];
      const uvs = [];
      const indices = [];

      const pVal = (p === 'inf' || p === Infinity) ? 28.0 : (p < 1 ? 1.0 : Number(p));

      for (let lat = 0; lat <= subdivisions; lat++) {
        const theta = (lat * Math.PI) / subdivisions - Math.PI / 2;
        const sinT = Math.sin(theta);
        const cosT = Math.cos(theta);

        for (let lon = 0; lon <= subdivisions; lon++) {
          const phi = (lon * 2 * Math.PI) / subdivisions;
          const sinP = Math.sin(phi);
          const cosP = Math.cos(phi);

          const x0 = cosT * cosP;
          const y0 = sinT;
          const z0 = cosT * sinP;

          const absX = Math.abs(x0);
          const absY = Math.abs(y0);
          const absZ = Math.abs(z0);

          let r;
          if (p === 'inf' || p === Infinity) {
            r = Math.max(absX, absY, absZ);
          } else {
            r = Math.pow(
              Math.pow(absX, pVal) + Math.pow(absY, pVal) + Math.pow(absZ, pVal),
              1.0 / pVal
            );
          }
          r = Math.max(r, 1e-6);

          const x = x0 / r;
          const y = y0 / r;
          const z = z0 / r;

          vertices.push(x, y, z);

          let nx, ny, nz;
          if (pVal <= 2.0) {
            nx = Math.sign(x) * Math.pow(Math.abs(x), Math.max(0, pVal - 1));
            ny = Math.sign(y) * Math.pow(Math.abs(y), Math.max(0, pVal - 1));
            nz = Math.sign(z) * Math.pow(Math.abs(z), Math.max(0, pVal - 1));
          } else {
            const pNormGrad = Math.min(6.0, pVal - 1);
            nx = Math.sign(x) * Math.pow(Math.abs(x), pNormGrad);
            ny = Math.sign(y) * Math.pow(Math.abs(y), pNormGrad);
            nz = Math.sign(z) * Math.pow(Math.abs(z), pNormGrad);
          }
          const nLen = Math.hypot(nx, ny, nz) || 1;
          normals.push(nx / nLen, ny / nLen, nz / nLen);

          uvs.push(lon / subdivisions, lat / subdivisions);
        }
      }

      for (let lat = 0; lat < subdivisions; lat++) {
        for (let lon = 0; lon < subdivisions; lon++) {
          const first = lat * (subdivisions + 1) + lon;
          const second = first + subdivisions + 1;

          indices.push(first, second, first + 1);
          indices.push(second, second + 1, first + 1);
        }
      }

      return {
        vertices: new Float32Array(vertices),
        normals: new Float32Array(normals),
        uvs: new Float32Array(uvs),
        indices: new Uint32Array(indices)
      };
    }
  }

  // ==========================================================================
  // 2. PROJECTIVE TENSOR PRODUCTS & SELECTION FUNCTORS (Def 12.16)
  // ==========================================================================
  class ProjectiveTensorProduct {
    static tensor(v, w) {
      const n = v.length;
      const m = w.length;
      const out = new Float64Array(n * m);
      for (let i = 0; i < n; i++) {
        const vi = v[i];
        const row = i * m;
        for (let j = 0; j < m; j++) {
          out[row + j] = vi * w[j];
        }
      }
      return out;
    }

    static evaluateSelectionFunctors(v) {
      const n = v.length;
      const results = {};
      results.sel4_dim = n * n;
      results.sel4_asym = this.tensor(v, v);

      const symFull = new Float64Array(n * n);
      const alt = new Float64Array(n * n);

      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          const idx1 = i * n + j;
          const idx2 = j * n + i;
          symFull[idx1] = 0.5 * (results.sel4_asym[idx1] + results.sel4_asym[idx2]);
          alt[idx1] = 0.5 * (results.sel4_asym[idx1] - results.sel4_asym[idx2]);
        }
      }

      results.sel3_sym = symFull;
      results.sel3_dim = (n * (n + 1)) / 2;
      results.sel1_alt = alt;
      results.kernelDim = results.sel4_dim - results.sel3_dim;
      return results;
    }
  }

  // ==========================================================================
  // 3. CONTEXT TRIPARTITE STRUCTURE & CORTICAL RECEPTIVE FIELDS (Def 1.4 & 1.11)
  // ==========================================================================
  class TripartiteContext {
    constructor(name, dim = 14, filterType = 'horiz') {
      this.name = name || 'CorticalStalk';
      this.dim = dim;
      this.filterType = filterType;

      this.a_bounds = new Float64Array(dim).fill(-1.0);
      this.b_bounds = new Float64Array(dim).fill(1.0);
      this.focal_p = new Float64Array(dim);

      this.alpha_bounds = new Float64Array(dim).fill(0.0);
      this.beta_bounds = new Float64Array(dim).fill(1.0);
      this.focal_d = new Float64Array(dim).fill(0.90);

      this.z_cipher = new Float64Array(dim);
      this.zeta_cipher = new Float64Array(dim);
      for (let i = 0; i < dim; i++) {
        this.z_cipher[i] = Math.cos(i * 0.45);
        this.zeta_cipher[i] = Math.sin(i * 0.45);
      }

      this.coordinationStrengths = new Float64Array(dim);
      this.coordinatedState = new Float64Array(dim);

      // 16x16 Zero-Mean Normalized Spatial Receptive Field Kernel
      this.spatialFilter = new Float32Array(16 * 16);
      this.initSpatialFilter(filterType);
    }

    initSpatialFilter(type) {
      let sum = 0;
      for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 16; x++) {
          const idx = y * 16 + x;
          const dx = x - 7.5;
          const dy = y - 7.5;
          const r = Math.hypot(dx, dy);

          let raw = 0;
          if (type === 'horiz') {
            raw = Math.cos(dy * 1.0) * Math.exp(-(dx * dx + dy * dy) / 36.0);
          } else if (type === 'vert') {
            raw = Math.cos(dx * 1.0) * Math.exp(-(dx * dx + dy * dy) / 36.0);
          } else if (type === 'diag') {
            raw = Math.cos((dx - dy) * 0.8) * Math.exp(-(dx * dx + dy * dy) / 36.0);
          } else if (type === 'circle') {
            raw = Math.exp(-Math.pow(r - 5.0, 2) / 3.5) - 0.6 * Math.exp(-(r * r) / 8.0);
          }
          this.spatialFilter[idx] = raw;
          sum += raw;
        }
      }

      // Zero-mean and unit variance normalization (eliminates background DC shift)
      const mean = sum / 256.0;
      let normSq = 0;
      for (let i = 0; i < 256; i++) {
        this.spatialFilter[i] -= mean;
        normSq += this.spatialFilter[i] * this.spatialFilter[i];
      }
      const std = Math.sqrt(normSq) || 1.0;
      for (let i = 0; i < 256; i++) {
        this.spatialFilter[i] /= std;
      }
    }

    /**
     * Filters 2D retinal pixel array through the zero-mean receptive field kernel.
     */
    convolveRetina(pixelArray, width = 16, height = 16) {
      const len = Math.min(pixelArray.length, this.spatialFilter.length);
      const output = new Float64Array(this.dim);

      let totalDot = 0;
      for (let idx = 0; idx < len; idx++) {
        totalDot += pixelArray[idx] * this.spatialFilter[idx];
      }
      const baseResponse = Math.tanh(totalDot * 0.45);

      for (let q = 0; q < this.dim; q++) {
        const subPhase = (q - 6.5) * 0.18;
        output[q] = Math.tanh(baseResponse * (1.0 + 0.12 * Math.cos(subPhase)));
      }
      return output;
    }

    update(rawReceptiveInput, dt = 0.016, topDownPrior = 0.0) {
      for (let q = 0; q < this.dim; q++) {
        const inputVal = (rawReceptiveInput[q] || 0) - topDownPrior;
        const targetP = Math.tanh(inputVal);
        this.focal_p[q] = this.focal_p[q] * 0.70 + targetP * 0.30;

        const confSignal = 0.85 + 0.15 * Math.cos(dt * (q + 1) * 2.0);
        this.focal_d[q] = Math.max(0.0, Math.min(1.0, confSignal));

        const salienceP = Math.abs(this.z_cipher[q]) * Math.abs(this.focal_p[q]);
        const salienceD = Math.abs(this.zeta_cipher[q]) * this.focal_d[q];
        const chi = Math.max(0.0, salienceD + salienceP - 1.0);
        this.coordinationStrengths[q] = chi;

        this.coordinatedState[q] = this.focal_p[q] * (0.6 + 0.4 * chi);
      }
      return this.coordinatedState;
    }
  }

  // ==========================================================================
  // 4. CARRIER PUSHOUT & MULTI-MODAL JUNCTION BINDING (Thm 3.3, Def 3.16)
  // ==========================================================================
  class CarrierPushout {
    static computePushout(stateA, stateB, couplingStrength = 0.65) {
      const p = stateA.length;
      const q = stateB.length;
      const coproductDim = p + q;

      const maxOverlap = Math.min(p, q);
      const rankDelta = Math.max(1, Math.min(maxOverlap, Math.round(couplingStrength * maxOverlap)));
      const pushoutDim = coproductDim - rankDelta;
      const confIndex = rankDelta > 0 ? 2 : 1;

      const amalgamated = new Float64Array(Math.max(p, q));
      let discrepancyNorm = 0;

      for (let i = 0; i < amalgamated.length; i++) {
        const valA = i < p ? stateA[i] : 0;
        const valB = i < q ? stateB[i] : 0;
        if (i < rankDelta) {
          amalgamated[i] = 0.5 * (valA + valB);
          discrepancyNorm += Math.abs(valA - valB);
        } else {
          amalgamated[i] = valA + valB;
        }
      }

      return {
        coproductDim,
        pushoutDim,
        confIndex,
        amalgamatedVector: amalgamated,
        overlapDiscrepancy: discrepancyNorm / Math.max(1, rankDelta)
      };
    }
  }

  // ==========================================================================
  // 5. OPERADIC FEATURE ABSTRACTION ENGINE (Episyllogismus - Thm 12.3 & Thm 2.11)
  // ==========================================================================
  class EpisyllogismusEngine {
    constructor(inputDim = 56, outputDim = 24) {
      this.inputDim = inputDim;
      this.outputDim = outputDim;

      this.weights = new Float64Array(outputDim * inputDim);
      this.bilinearWeights = new Float64Array(outputDim * inputDim);
      this.fragmentMemory = new Float64Array(outputDim);

      this.initContractiveWeights();

      this.lastErasureKernelDim = 0;
      this.lastErasureRatio = 0;
      this.lastAlternatingNullEnergy = 0;
      this.lastSymmetricPassEnergy = 0;
    }

    initContractiveWeights() {
      for (let o = 0; o < this.outputDim; o++) {
        for (let i = 0; i < this.inputDim; i++) {
          const idx = o * this.inputDim + i;
          this.weights[idx] = (Math.sin(idx * 1.618) * Math.cos(idx * 0.707)) / Math.sqrt(this.inputDim);
          this.bilinearWeights[idx] = (Math.cos(idx * 2.718) * 0.5) / Math.sqrt(this.inputDim);
        }
      }
    }

    /**
     * Consumes 56D unimodal cortical stalk signals, projects onto the symmetric
     * coinvariant quotient Sym^2(F_gamma), actively eliminates the alternating
     * phase/position-sensitive nullspace Lambda^2(F_gamma), and applies Beck's
     * Distributive Law coupling feedforward features with contextual memory.
     */
    consume(stalkVector) {
      const inLen = Math.min(stalkVector.length, this.inputDim);
      const quotient = new Float64Array(this.outputDim);

      const half = inLen >> 1;
      let altEnergySq = 0;
      let symEnergySq = 0;

      for (let i = 0; i < half; i++) {
        const xa = stalkVector[i];
        const xb = stalkVector[i + half];
        const j = (i + 1) % half;
        const ya = stalkVector[j];
        const yb = stalkVector[j + half];

        const symTerm = 0.5 * (xa * yb + xb * ya);
        const altTerm = 0.5 * (xa * yb - xb * ya); // Annihilated phase syntax
        symEnergySq += symTerm * symTerm;
        altEnergySq += altTerm * altTerm;
      }
      this.lastAlternatingNullEnergy = Math.sqrt(altEnergySq);
      this.lastSymmetricPassEnergy = Math.sqrt(symEnergySq);

      for (let o = 0; o < this.outputDim; o++) {
        let linearAcc = 0;
        let bilinearAcc = 0;
        const row = o * this.inputDim;

        for (let i = 0; i < inLen; i++) {
          const xi = stalkVector[i];
          const xPair = stalkVector[(i + 14) % inLen];
          const symPair = 0.5 * (xi + xPair) + 0.25 * (xi * xPair);
          linearAcc += symPair * this.weights[row + i];
          bilinearAcc += (xi * xPair) * this.bilinearWeights[row + i];
        }

        const pyrVal = Math.tanh(linearAcc + 0.35 * bilinearAcc);
        const homVal = 0.78 * pyrVal + 0.22 * this.fragmentMemory[o];
        this.fragmentMemory[o] = homVal;
        quotient[o] = homVal;
      }

      const totalEnergy = this.lastSymmetricPassEnergy + this.lastAlternatingNullEnergy;
      this.lastErasureRatio = totalEnergy > 1e-9 ? this.lastAlternatingNullEnergy / totalEnergy : 0.0;
      this.lastErasureKernelDim = (inLen * (inLen - 1)) / 2;

      return {
        quotientVector: quotient,
        symmetricEnergy: this.lastSymmetricPassEnergy,
        alternatingNullEnergy: this.lastAlternatingNullEnergy,
        erasureRatio: this.lastErasureRatio,
        theoreticalKerDim: this.lastErasureKernelDim
      };
    }
  }

  // ==========================================================================
  // 6. INVARIANT ASSOCIATION CORTEX PROTOTYPES (IT / STG Tokens - Thm 12.5)
  // ==========================================================================
  class ProtosimplexEngine {
    constructor() {
      // 6 Invariant Visual Shape Prototypes (Categorical Attractors):
      this.atoms = [
        { id: 'P_horiz', label: 'Horizontal Line/Bar', vector: new Float64Array(6), energy: 0.0 },
        { id: 'P_vert', label: 'Vertical Line/Bar', vector: new Float64Array(6), energy: 0.0 },
        { id: 'P_diag', label: 'Diagonal Stroke', vector: new Float64Array(6), energy: 0.0 },
        { id: 'P_circle', label: 'Circle / Closed Loop', vector: new Float64Array(6), energy: 0.0 },
        { id: 'P_cross', label: 'Cross / Junction', vector: new Float64Array(6), energy: 0.0 },
        { id: 'P_gestalt', label: 'Complex Gestalt', vector: new Float64Array(6), energy: 0.0 }
      ];

      this.winningPrototype = this.atoms[0];
      this.confidence = 0.0;
    }

    /**
     * Matches stalk column profiles & operadic coinvariants against shape prototypes.
     */
    match(stalks, coinvariantQuotient) {
      let hVal = 0, vVal = 0, dVal = 0, cVal = 0;
      for (let i = 0; i < 14; i++) {
        hVal += stalks[0][i];
        vVal += stalks[1][i];
        dVal += stalks[2][i];
        cVal += stalks[3][i];
      }
      hVal /= 14;
      vVal /= 14;
      dVal /= 14;
      cVal /= 14;

      const scores = new Float64Array(6);

      // 1. Cross: Both H and V are strongly positive simultaneously!
      const crossDetector = Math.max(0, Math.min(hVal, vVal) * 1.8);

      // 2. Horiz: Strong H, weak or negative V
      scores[0] = Math.max(0, hVal - 0.6 * Math.max(0, vVal) - 0.4 * Math.max(0, dVal));

      // 3. Vert: Strong V, weak or negative H
      scores[1] = Math.max(0, vVal - 0.6 * Math.max(0, hVal) - 0.4 * Math.max(0, dVal));

      // 4. Diag: Strong D, weak H and V
      scores[2] = Math.max(0, dVal - 0.4 * (Math.max(0, hVal) + Math.max(0, vVal)));

      // 5. Circle: Strong C
      scores[3] = Math.max(0, cVal - 0.2 * (Math.max(0, hVal) + Math.max(0, vVal)));

      // 6. Cross: Orthogonal intersection
      scores[4] = crossDetector;

      // 7. Gestalt: Mixed activation
      scores[5] = 0.25 * (Math.abs(hVal) + Math.abs(vVal) + Math.abs(dVal) + Math.abs(cVal));

      // If cross is active, suppress pure horiz/vert
      if (scores[4] > 0.3) {
        scores[0] *= 0.4;
        scores[1] *= 0.4;
      }

      let maxScore = -1;
      let bestIdx = 0;

      for (let a = 0; a < this.atoms.length; a++) {
        const atom = this.atoms[a];
        atom.energy = atom.energy * 0.70 + scores[a] * 0.30;
        for (let k = 0; k < 6; k++) {
          atom.vector[k] = coinvariantQuotient[(a * 4 + k) % coinvariantQuotient.length] || 0;
        }

        if (atom.energy > maxScore) {
          maxScore = atom.energy;
          bestIdx = a;
        }
      }

      this.winningPrototype = this.atoms[bestIdx];
      this.confidence = Math.min(1.0, maxScore * 1.8);

      return {
        atoms: this.atoms,
        winningPrototype: this.winningPrototype,
        confidence: this.confidence
      };
    }
  }

  // ==========================================================================
  // 7. CORTICAL COLUMN SHEAF TOPOS & CECH CONSENSUS (Ch. 1)
  // ==========================================================================
  class SheafToposEngine {
    constructor() {
      // 4 Unimodal Cortical Column Stalks with Orientation-Tuned Receptive Fields:
      // U0: Horizontal, U1: Vertical, U2: Diagonal, U3: Circle/Surround DoG
      this.contexts = [
        new TripartiteContext('U0_Horizontal_V1', 14, 'horiz'),
        new TripartiteContext('U1_Vertical_V1', 14, 'vert'),
        new TripartiteContext('U2_Diagonal_V1', 14, 'diag'),
        new TripartiteContext('U3_Circle_V1', 14, 'circle')
      ];

      this.stalks = [
        this.contexts[0].coordinatedState,
        this.contexts[1].coordinatedState,
        this.contexts[2].coordinatedState,
        this.contexts[3].coordinatedState
      ];

      this.splitWeights = new Float64Array([0.28, 0.26, 0.24, 0.22]);
      this.holoformSection = new Float64Array(14);
      this.cechDefectNorm = 0.0;
      this.cechDefectMatrix = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];
      this.sublationCount = 0;
    }

    /**
     * Transduces a 2D retinal pixel array through oriented receptive fields,
     * updates each tripartite stalk, computes Cech 0-coboundary prediction error,
     * and executes lateral Laplacian sublation (Aufhebung).
     */
    update(pixelArray, width = 16, height = 16, dt = 0.016, topDownPrior = null) {
      for (let c = 0; c < 4; c++) {
        const filtered = this.contexts[c].convolveRetina(pixelArray, width, height);
        const prior = topDownPrior ? (topDownPrior[c] || 0) * 0.15 : 0.0;
        this.contexts[c].update(filtered, dt, prior);
      }

      // Compute Cech 0-Coboundary Defect between overlapping column receptive fields
      let totalDefectSq = 0;
      let count = 0;
      for (let i = 0; i < 4; i++) {
        for (let j = i + 1; j < 4; j++) {
          let diffSum = 0;
          for (let k = 0; k < 14; k++) {
            const d = this.stalks[i][k] - this.stalks[j][k];
            diffSum += d * d;
          }
          const defect = Math.sqrt(diffSum);
          this.cechDefectMatrix[i][j] = defect;
          this.cechDefectMatrix[j][i] = defect;
          totalDefectSq += diffSum;
          count++;
        }
      }
      this.cechDefectNorm = Math.sqrt(totalDefectSq / Math.max(1, count));

      // Global Holoform Amalgamation Gamma = sum sigma_i*(s_i)
      for (let k = 0; k < 14; k++) {
        this.holoformSection[k] =
          this.splitWeights[0] * this.stalks[0][k] +
          this.splitWeights[1] * this.stalks[1][k] +
          this.splitWeights[2] * this.stalks[2][k] +
          this.splitWeights[3] * this.stalks[3][k];
      }

      // Lateral Cortical Sublation (Aufhebung via Cech Laplacian)
      if (this.cechDefectNorm > 0.40) {
        this.sublationCount++;
        const laplacianRate = 0.12;
        for (let s = 0; s < 4; s++) {
          for (let k = 0; k < 14; k++) {
            let laplacianDiff = 0;
            for (let j = 0; j < 4; j++) {
              if (j !== s) laplacianDiff += (this.stalks[s][k] - this.stalks[j][k]);
            }
            this.stalks[s][k] -= laplacianRate * laplacianDiff;
          }
        }
      }

      const unifiedStalks = new Float64Array(56);
      for (let s = 0; s < 4; s++) {
        unifiedStalks.set(this.stalks[s], s * 14);
      }
      return unifiedStalks;
    }
  }

  // ==========================================================================
  // 8. CORTICAL ABSTRACTION & PREDICTIVE CODING CORE (Tier 4)
  // ==========================================================================
  class CorticalAbstractionCore {
    constructor() {
      this.hiddenDim = 32;
      this.h = new Float64Array(32);
      this.v = new Float64Array(32);

      // 12D Invariant Multimodal Representation Vector z*
      this.invariantRepresentation = new Float64Array(12);

      // Reconstructed 16x16 Retinal Image from Top-Down Generative Feedback
      this.predictedRetina = new Float32Array(16 * 16);

      // 36-Component Non-Hermitian Metric Tensor field on R_6 = R_4 x S_2 (Def 9.2)
      this.hermetryMatrix6x6 = new Float64Array(36);
      this.symmetricEnergy21 = 0.0;
      this.skewVorticity15 = 0.0;

      // Lyapunov Recurrent Free Energy V(h) and Dissipation Rate dV/dt <= 0
      this.lyapunovPotential = 0.0;
      this.lyapunovDerivative = 0.0;

      // Predictive coding error ||x - x_pred||
      this.predictionError = 0.0;
      this.featureInvarianceScore = 1.0;

      // Backward-compatible aliases
      this.qualiaRepresentation = this.invariantRepresentation;
      this.qualiaCoherence = 1.0;
      this.egoApex = this.invariantRepresentation;
      this.egoConvergence = 1.0;
    }

    computeAcceleration(hState, vState, coinvariantQuotient, winningAtom) {
      const qLen = coinvariantQuotient.length;
      const a = new Float64Array(this.hiddenDim);

      for (let i = 0; i < this.hiddenDim; i++) {
        const qVal = coinvariantQuotient[i % qLen] || 0;
        const atomVal = winningAtom ? winningAtom.vector[i % 6] : 0;

        // Non-linear dendritic geodesic coupling -Gamma^i_{kl} v^k v^l (SM Eq. 93a)
        const vNext = vState[(i + 1) % this.hiddenDim];
        const christoffelDrag = -0.08 * Math.sin(hState[i]) * vState[i] * vNext;
        const damping = -0.42 * vState[i];
        const restoring = -0.28 * hState[i];
        const driving = 0.55 * qVal + 0.35 * atomVal;

        a[i] = restoring + damping + christoffelDrag + driving;
      }
      return a;
    }

    step(coinvariantQuotient, winningAtom, rawInputRetina, dt = 0.016) {
      const a0 = this.computeAcceleration(this.h, this.v, coinvariantQuotient, winningAtom);

      const dtSqHalf = 0.5 * dt * dt;
      const hNext = new Float64Array(this.hiddenDim);
      const vHalf = new Float64Array(this.hiddenDim);

      for (let i = 0; i < this.hiddenDim; i++) {
        hNext[i] = Math.tanh(this.h[i] + this.v[i] * dt + a0[i] * dtSqHalf);
        vHalf[i] = this.v[i] + 0.5 * a0[i] * dt;
      }

      const a1 = this.computeAcceleration(hNext, vHalf, coinvariantQuotient, winningAtom);

      let vEnergy = 0;
      let vDissip = 0;
      for (let i = 0; i < this.hiddenDim; i++) {
        this.h[i] = hNext[i];
        this.v[i] = vHalf[i] + 0.5 * a1[i] * dt;
        vEnergy += 0.5 * (0.28 * this.h[i] * this.h[i] + this.v[i] * this.v[i]);
        vDissip += -0.42 * this.v[i] * this.v[i];
      }
      this.lyapunovPotential = vEnergy;
      this.lyapunovDerivative = vDissip;

      // 36-Component Metric Tensor on R_6 (21 Symmetric Potentials + 15 Skew Attentional Vorticity)
      let symEnergySq = 0;
      let skewEnergySq = 0;
      for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 6; c++) {
          const rawRC = this.h[(r * 5 + c) % this.hiddenDim];
          const rawCR = this.h[(c * 5 + r) % this.hiddenDim];
          const gPlus = (r === c ? 1.0 : 0.0) + 0.15 * (rawRC + rawCR);
          const gMinus = (r !== c) ? 0.15 * (rawRC - rawCR) : 0.0;
          this.hermetryMatrix6x6[r * 6 + c] = gPlus + gMinus;
          if (r <= c) symEnergySq += (gPlus - (r === c ? 1.0 : 0.0)) ** 2;
          if (r < c) skewEnergySq += gMinus * gMinus;
        }
      }
      this.symmetricEnergy21 = Math.sqrt(symEnergySq);
      this.skewVorticity15 = Math.sqrt(skewEnergySq);

      // Synthesize 12D Invariant Latent Representation z*
      let representationDrift = 0;
      for (let k = 0; k < 12; k++) {
        const oldVal = this.invariantRepresentation[k];
        const atomVal = winningAtom ? (winningAtom.vector[k % 6] || 0) : 0;
        const targetVal = Math.tanh(0.6 * this.h[k] + 0.4 * atomVal);
        const newVal = 0.8 * oldVal + 0.2 * targetVal;
        this.invariantRepresentation[k] = newVal;
        representationDrift += Math.abs(newVal - oldVal);
      }
      this.featureInvarianceScore = 1.0 - Math.min(1.0, representationDrift);
      this.qualiaCoherence = this.featureInvarianceScore;
      this.egoConvergence = this.featureInvarianceScore;

      // Top-Down Generative Predictive Coding: reconstruct predicted 16x16 visual field
      let errSum = 0;
      const len = Math.min(rawInputRetina.length, this.predictedRetina.length);

      for (let idx = 0; idx < len; idx++) {
        const y = Math.floor(idx / 16);
        const x = idx % 16;
        const dx = x - 7.5;
        const dy = y - 7.5;

        let pred = 0;
        if (winningAtom && winningAtom.id === 'P_horiz') {
          pred = Math.exp(-(dy * dy) / 3.0) * (Math.abs(dx) <= 6.0 ? 1.0 : 0.0);
        } else if (winningAtom && winningAtom.id === 'P_vert') {
          pred = Math.exp(-(dx * dx) / 3.0) * (Math.abs(dy) <= 6.0 ? 1.0 : 0.0);
        } else if (winningAtom && winningAtom.id === 'P_diag') {
          const d = Math.abs(dx - dy);
          pred = Math.exp(-(d * d) / 3.0) * (Math.hypot(dx, dy) <= 6.5 ? 1.0 : 0.0);
        } else if (winningAtom && winningAtom.id === 'P_circle') {
          const r = Math.hypot(dx, dy);
          pred = Math.exp(-Math.pow(r - 5.0, 2) / 3.0);
        } else if (winningAtom && winningAtom.id === 'P_cross') {
          const horizStroke = Math.exp(-(dy * dy) / 3.0) * (Math.abs(dx) <= 6.0 ? 1.0 : 0.0);
          const vertStroke = Math.exp(-(dx * dx) / 3.0) * (Math.abs(dy) <= 6.0 ? 1.0 : 0.0);
          pred = Math.max(horizStroke, vertStroke);
        } else {
          pred = Math.abs(this.invariantRepresentation[idx % 12]) * 0.5;
        }

        const confidenceGain = winningAtom ? Math.min(1.0, winningAtom.energy * 2.0) : 0.5;
        this.predictedRetina[idx] = Math.max(0.0, Math.min(1.0, pred * confidenceGain));
        const diff = rawInputRetina[idx] - this.predictedRetina[idx];
        errSum += diff * diff;
      }

      this.predictionError = Math.sqrt(errSum / Math.max(1, len));

      return {
        invariantRepresentation: this.invariantRepresentation,
        predictedRetina: this.predictedRetina,
        predictionError: this.predictionError,
        featureInvarianceScore: this.featureInvarianceScore,
        symmetricEnergy21: this.symmetricEnergy21,
        skewVorticity15: this.skewVorticity15,
        lyapunovPotential: this.lyapunovPotential,
        lyapunovDerivative: this.lyapunovDerivative
      };
    }
  }

  // ==========================================================================
  // 9. UNIFIED OPERADIC NEURAL TOPOS ENGINE (v2.2.0)
  // ==========================================================================
  class OperadicNeuralTopos {
    constructor() {
      this.banachSpaces = {
        l1: new BanachSpace('ell_1', 3, 1),
        l2: new BanachSpace('ell_2', 3, 2),
        l4: new BanachSpace('ell_4', 3, 4),
        lInf: new BanachSpace('ell_inf', 3, 'inf')
      };

      this.sheaf = new SheafToposEngine();
      this.episyllogismus = new EpisyllogismusEngine(56, 24);
      this.protosimplex = new ProtosimplexEngine();
      this.core = new CorticalAbstractionCore();
      this.owm = this.core; // Alias

      this.stepCounter = 0;
      this.simTime = 0.0;

      // 16x16 Retinal Visual Input Buffer
      this.retinaWidth = 16;
      this.retinaHeight = 16;
      this.currentRetina = new Float32Array(16 * 16);

      this.telemetry = {
        step: 0,
        simTime: 0,
        predictionError: 0,
        featureInvariance: 1.0,
        qualiaCoherence: 1.0, // Alias
        winningPrototypeId: 'P_horiz',
        winningPrototypeLabel: 'Horizontal Line/Bar',
        prototypeConfidence: 0,
        erasureRatio: 0,
        alternatingNullEnergy: 0,
        cechDefectNorm: 0,
        conflexivityIndex: 2,
        symmetricHermetry21: 0,
        skewHermetry15: 0,
        lyapunovPotential: 0,
        lyapunovDerivative: 0,
        sublationCount: 0
      };
    }

    /**
     * Accepts either a 2D 16x16 pixel array (256 numbers in [0, 1]),
     * or a fallback 13D array, and executes one full hierarchical cycle.
     */
    step(inputRetinaArray, dt = 0.016) {
      this.stepCounter++;
      this.simTime += dt;

      if (inputRetinaArray && inputRetinaArray.length >= 256) {
        this.currentRetina.set(inputRetinaArray.subarray(0, 256));
      } else if (inputRetinaArray && inputRetinaArray.length === 13) {
        for (let i = 0; i < 256; i++) {
          this.currentRetina[i] = Math.abs(inputRetinaArray[i % 13] || 0);
        }
      }

      // Tier 0 -> Tier 1: Receptive field filtering & Cech descent
      const stalkVector = this.sheaf.update(
        this.currentRetina,
        this.retinaWidth,
        this.retinaHeight,
        dt,
        this.core.invariantRepresentation
      );

      // Tier 1 -> Tier 2: Operadic syntax erasure on Sym^2(F_gamma)
      const consumption = this.episyllogismus.consume(stalkVector);

      // Multi-modal junction pushout
      const pushout = CarrierPushout.computePushout(
        this.sheaf.stalks[0],
        this.sheaf.stalks[1],
        0.75
      );

      // Tier 2 -> Tier 3: Invariant shape prototype matching
      const protoMatch = this.protosimplex.match(
        this.sheaf.stalks,
        consumption.quotientVector
      );

      // Tier 3 -> Tier 4: Invariant feature synthesis & Predictive Coding reconstruction
      const coreStep = this.core.step(
        consumption.quotientVector,
        protoMatch.winningPrototype,
        this.currentRetina,
        dt
      );

      const t = this.telemetry;
      t.step = this.stepCounter;
      t.simTime = this.simTime;
      t.predictionError = coreStep.predictionError;
      t.featureInvariance = coreStep.featureInvarianceScore;
      t.qualiaCoherence = coreStep.featureInvarianceScore;
      t.winningPrototypeId = protoMatch.winningPrototype.id;
      t.winningPrototypeLabel = protoMatch.winningPrototype.label;
      t.prototypeConfidence = protoMatch.confidence;
      t.erasureRatio = consumption.erasureRatio;
      t.alternatingNullEnergy = consumption.alternatingNullEnergy;
      t.cechDefectNorm = this.sheaf.cechDefectNorm;
      t.conflexivityIndex = pushout.confIndex;
      t.symmetricHermetry21 = coreStep.symmetricEnergy21;
      t.skewHermetry15 = coreStep.skewVorticity15;
      t.lyapunovPotential = coreStep.lyapunovPotential;
      t.lyapunovDerivative = coreStep.lyapunovDerivative;
      t.sublationCount = this.sheaf.sublationCount;

      return {
        retina: this.currentRetina,
        stalkVector,
        consumption,
        pushout,
        protoMatch,
        coreStep,
        telemetry: t
      };
    }

    generate3DGraphLayout() {
      const nodes = [];
      const links = [];

      // Tier 0: Retinal Receptors (16 sample nodes at y = -7.0)
      for (let i = 0; i < 16; i++) {
        const angle = (i / 16) * Math.PI * 2;
        nodes.push({
          id: `retina_${i}`,
          tier: 0,
          label: `Retinal Receptor r_${i}`,
          pos: [Math.cos(angle) * 5.2, -7.0, Math.sin(angle) * 5.2],
          color: 0x38bdf8,
          radius: 0.20,
          voltage: Math.abs(this.currentRetina[i * 16] || 0)
        });
      }

      // Tier 1: 4 Cortical Column Stalks (14 nodes each, y = -3.5)
      const clusterCenters = [
        [-4.5, -3.5, -3.5], // Horizontal
        [4.5, -3.5, -3.5],  // Vertical
        [4.5, -3.5, 4.5],   // Diagonal
        [-4.5, -3.5, 4.5]   // Circle / Surround
      ];
      const clusterNames = ['V1_Horizontal', 'V1_Vertical', 'V1_Diagonal', 'V1_Circle'];
      const clusterColors = [0x38bdf8, 0x10b981, 0xf59e0b, 0xc084fc];

      for (let c = 0; c < 4; c++) {
        const [cx, cy, cz] = clusterCenters[c];
        for (let i = 0; i < 14; i++) {
          const subAngle = (i / 14) * Math.PI * 2;
          const nid = `stalk_${c}_${i}`;
          const volt = Math.abs(this.sheaf.stalks[c][i] || 0);
          nodes.push({
            id: nid,
            tier: 1,
            cluster: c,
            label: `${clusterNames[c]} Column ${i}`,
            pos: [cx + Math.cos(subAngle) * 1.8, cy + (i % 2 === 0 ? 0.3 : -0.3), cz + Math.sin(subAngle) * 1.8],
            color: clusterColors[c],
            radius: 0.18 + 0.08 * volt,
            voltage: volt
          });

          const rIdx = (c * 4 + i) % 16;
          links.push({
            source: `retina_${rIdx}`,
            target: nid,
            type: 'sensory_to_stalk',
            color: 0x38bdf8,
            opacity: 0.25 + 0.35 * volt
          });
        }
      }

      // Lateral Cech overlap links
      for (let c1 = 0; c1 < 4; c1++) {
        for (let c2 = c1 + 1; c2 < 4; c2++) {
          const defect = this.sheaf.cechDefectMatrix[c1][c2] || 0;
          links.push({
            source: `stalk_${c1}_0`,
            target: `stalk_${c2}_0`,
            type: 'cech_overlap',
            color: defect > 0.40 ? 0xf43f5e : 0x10b981,
            opacity: Math.min(0.9, 0.3 + defect)
          });
        }
      }

      // Tier 2: Operadic Feature Abstraction (24 Coinvariant Nodes, y = 0.5)
      for (let i = 0; i < 24; i++) {
        const angle = (i / 24) * Math.PI * 2;
        const nid = `operadic_${i}`;
        const volt = Math.abs(this.episyllogismus.fragmentMemory[i] || 0);
        nodes.push({
          id: nid,
          tier: 2,
          label: `Abstracted Coinvariant F_${i}`,
          pos: [Math.cos(angle) * 3.6, 0.5, Math.sin(angle) * 3.6],
          color: 0xc084fc,
          radius: 0.25 + 0.1 * volt,
          voltage: volt
        });

        const stalkCluster = i % 4;
        const stalkIdx = (i * 2) % 14;
        links.push({
          source: `stalk_${stalkCluster}_${stalkIdx}`,
          target: nid,
          type: 'operadic_consumption',
          color: 0xc084fc,
          opacity: 0.3 + 0.4 * volt
        });
      }

      // Tier 3: Invariant Association Cortex Prototypes (6 Prototype Nodes, y = 4.0)
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const nid = `proto_${i}`;
        const atom = this.protosimplex.atoms[i];
        nodes.push({
          id: nid,
          tier: 3,
          label: atom.label,
          pos: [Math.cos(angle) * 2.4, 4.0, Math.sin(angle) * 2.4],
          color: 0x10b981,
          radius: 0.38 + 0.15 * atom.energy,
          voltage: atom.energy
        });

        for (let j = 0; j < i; j++) {
          links.push({
            source: `proto_${j}`,
            target: nid,
            type: 'prototype_cross_link',
            color: 0x10b981,
            opacity: 0.45
          });
        }
      }

      // Tier 4: Cortical Abstraction Workspace Apex (Central Gestalt Hub, y = 7.5)
      nodes.push({
        id: 'invariant_apex',
        tier: 4,
        label: 'Invariant Feature Workspace Apex (Predictive Generative Hub)',
        pos: [0, 7.5, 0],
        color: 0xf59e0b,
        radius: 0.58,
        voltage: this.core.featureInvarianceScore
      });

      for (let q = 0; q < 6; q++) {
        const qAngle = (q / 6) * Math.PI * 2;
        const qid = `feature_dim_${q}`;
        const qVolt = Math.abs(this.core.invariantRepresentation[q] || 0);
        nodes.push({
          id: qid,
          tier: 4,
          label: `Invariant Feature Axis z*_${q}`,
          pos: [Math.cos(qAngle) * 1.45, 7.5, Math.sin(qAngle) * 1.45],
          color: 0xfbbf24,
          radius: 0.28 + 0.12 * qVolt,
          voltage: qVolt
        });

        links.push({
          source: `proto_${q}`,
          target: qid,
          type: 'prototype_to_feature',
          color: 0xf59e0b,
          opacity: 0.65
        });

        links.push({
          source: qid,
          target: 'invariant_apex',
          type: 'apex_binding',
          color: 0xf59e0b,
          opacity: 0.8
        });
      }

      // Top-Down Predictive Coding Feedback links from Apex to Tier 1 stalks
      for (let c = 0; c < 4; c++) {
        links.push({
          source: 'invariant_apex',
          target: `stalk_${c}_0`,
          type: 'predictive_coding_prior',
          color: 0x38bdf8,
          opacity: 0.6
        });
      }

      return { nodes, links };
    }
  }

  OperadicNeuralTopos.BanachSpace = BanachSpace;
  OperadicNeuralTopos.ProjectiveTensorProduct = ProjectiveTensorProduct;
  OperadicNeuralTopos.TripartiteContext = TripartiteContext;
  OperadicNeuralTopos.CarrierPushout = CarrierPushout;
  OperadicNeuralTopos.EpisyllogismusEngine = EpisyllogismusEngine;
  OperadicNeuralTopos.ProtosimplexEngine = ProtosimplexEngine;
  OperadicNeuralTopos.SheafToposEngine = SheafToposEngine;
  OperadicNeuralTopos.CorticalAbstractionCore = CorticalAbstractionCore;
  OperadicNeuralTopos.CorticalQualiaCore = CorticalAbstractionCore;
  OperadicNeuralTopos.OWMRecurrentCore = CorticalAbstractionCore;
  OperadicNeuralTopos.OperadicNeuralTopos = OperadicNeuralTopos;

  return OperadicNeuralTopos;
}));
