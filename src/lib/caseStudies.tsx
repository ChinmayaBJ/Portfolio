import type { ReactNode } from "react";

export type CaseLink = {
  label: string;
  href: string;
  variant: "ember" | "muted";
  /** "github" renders the GitHub mark, otherwise an up-right arrow. */
  icon: "arrow" | "github";
};

export type CaseBadge = { href: string; img: string; alt: string };

export type CaseStudy = {
  slug: string;
  title: string;
  year: string;
  tagline: string;
  active: boolean;
  lead: ReactNode;
  links: CaseLink[];
  badges?: CaseBadge[];
  /** ATS Screener's bespoke metric row. */
  metrics?: "ats";
  /** Browser-chrome address label on the hero screenshot, if any. */
  browserLabel?: string;
  /** object-position class for the hero screenshot. Default object-top. */
  objectClass?: string;
  /** Optional "team" note rendered in the sidebar. */
  team?: string;
  image: string;
  alt: string;
  body: ReactNode[];
  highlights: ReactNode[];
  builtWith: string[];
  cite?: {
    apa: string;
    bibtex: string;
    doi: { label: string; href: string };
    orcid: string;
  };
  next: { slug: string; title: string };
};

const Em = (s: string) => (
  <em className="font-medium not-italic text-ember">{s}</em>
);

export const CASE_STUDIES: Record<string, CaseStudy> = {
  "cat-net": {
    slug: "cat-net",
    title: "CAT-Net",
    year: "2025",
    tagline: "97% accuracy ECG arrhythmia classifier",
    active: true,
    lead: (
      <>
        A hybrid deep-learning architecture combining CNNs, attention mechanisms,
        and transformer blocks to classify cardiac arrhythmias from ECG signals
        with 97% accuracy — trained and validated on the MIT-BIH dataset.
      </>
    ),
    links: [
      {
        label: "Source",
        href: "https://github.com/ChinmayaBJ/cat-net",
        variant: "ember",
        icon: "github",
      },
    ],
    image: "/assets/shots/basalt.webp",
    alt: "CAT-Net ECG classifier screenshot",
    objectClass: "object-top",
    body: [
      <p key="c1">
        ECG arrhythmia classification is a sequence problem where the signal
        carries both local morphological features and long-range temporal
        dependencies. CAT-Net addresses both simultaneously with a{" "}
        {Em("three-stage architecture")}: a 1D CNN front-end for local feature
        extraction, a multi-head self-attention layer to weight diagnostically
        relevant intervals, and a transformer encoder to capture global rhythm
        context across the full beat sequence.
      </p>,
      <p key="c2">
        Trained on the MIT-BIH Arrhythmia Database (48 records, ~110,000
        annotated beats), the model classifies five rhythm classes (Normal, LBBB,
        RBBB, PVC, APC) and achieves {Em("97% overall accuracy")} with an F1
        score of 0.96 on the held-out test split. Preprocessing includes Pan-Tompkins
        R-peak detection, fixed-window segmentation, and per-sample Z-score
        normalization to handle signal amplitude variance across patients and
        recording equipment.
      </p>,
      <p key="c3">
        The attention mechanism proved critical: ablations removing it reduced
        accuracy by ~3.2 pp and hurt PVC recall most, confirming that the model
        learns to weight the ST-segment and T-wave features a cardiologist would
        focus on rather than memorizing waveform shape alone. The transformer
        stage contributed an additional 1.8 pp by catching inter-beat rhythm
        patterns invisible to a purely local classifier.
      </p>,
    ],
    highlights: [
      <>97% overall accuracy on MIT-BIH Arrhythmia Database, 5-class classification</>,
      <>
        Hybrid CNN + multi-head attention + transformer encoder — each stage
        addresses a distinct signal property
      </>,
      <>
        Pan-Tompkins R-peak detection and per-sample Z-score normalization for
        patient-agnostic generalization
      </>,
      <>
        Ablation study confirms attention learns clinically meaningful ECG
        features, not waveform shortcuts
      </>,
      <>F1 of 0.96 on held-out test split; PVC and APC classes included</>,
    ],
    builtWith: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "scikit-learn",
      "NumPy",
      "MIT-BIH Dataset",
      "Pan-Tompkins",
    ],
    next: { slug: "brightside", title: "BrightSide" },
  },

  brightside: {
    slug: "brightside",
    title: "BrightSide",
    year: "2025",
    tagline: "AI debate coaching with emotional intelligence",
    active: true,
    lead: (
      <>
        An AI-powered debate coaching platform that combines BERT-based argument
        analysis, GPT-driven rebuttal generation, and an emotional intelligence
        layer for real-time tone and sentiment feedback — published as an IEEE
        research paper in November 2025.
      </>
    ),
    links: [
      {
        label: "Source",
        href: "https://github.com/ChinmayaBJ/brightside",
        variant: "ember",
        icon: "github",
      },
    ],
    image: "/assets/shots/ats-screener.webp",
    alt: "BrightSide platform screenshot",
    objectClass: "object-top",
    body: [
      <p key="b1">
        Debate coaching at scale has a fundamental problem: it requires an expert
        evaluator present in real time. BrightSide replaces that bottleneck with
        a multi-model NLP pipeline that evaluates{" "}
        {Em("argument structure, logical coherence, and emotional tone")} simultaneously
        — giving feedback that a single human coach could not deliver at the
        granularity or speed a debater needs mid-round.
      </p>,
      <p key="b2">
        The architecture layers three models: a fine-tuned BERT encoder classifies
        argument type and detects logical fallacies in real time as the debater
        speaks; a GPT-based module generates contextual rebuttal suggestions
        grounded in the opponent&apos;s most recent argument; and a sentiment +
        arousal model from HuggingFace provides emotional-state tracking so the
        platform can flag when delivery is undermining content.
      </p>,
      <p key="b3">
        Evaluated across multiple debate formats (British Parliamentary, Oxford
        style, competitive policy), the system achieves strong inter-annotator
        agreement with expert human judges on argument quality scoring, and the
        IEEE paper proposes a{" "}
        {Em("multi-signal scoring framework")} that separates logical quality from
        rhetorical effectiveness — a distinction most automated evaluation systems
        collapse into a single score.
      </p>,
    ],
    highlights: [
      <>
        Fine-tuned BERT for real-time argument type classification and fallacy
        detection
      </>,
      <>GPT-driven rebuttal generation grounded in opponent argument context</>,
      <>
        Emotional intelligence layer (sentiment + arousal) provides tone
        feedback alongside content analysis
      </>,
      <>
        Multi-signal scoring framework published in IEEE (Nov 2025) separating
        logical and rhetorical quality
      </>,
      <>Evaluated across British Parliamentary, Oxford, and policy debate formats</>,
    ],
    builtWith: [
      "Python",
      "BERT",
      "GPT",
      "HuggingFace Transformers",
      "spaCy",
      "NLTK",
      "Flask",
      "React",
    ],
    next: { slug: "h2-leak", title: "H2 Leak Detector" },
  },

  "h2-leak": {
    slug: "h2-leak",
    title: "H2 Leak Detector",
    year: "2024",
    tagline: "ML pipeline for hydrogen leak anomaly detection",
    active: true,
    lead: (
      <>
        A production-grade ML pipeline for hydrogen leak detection in industrial
        sensor data, combining LSTM-based time-series forecasting with Isolation
        Forest anomaly detection — achieving R² of 0.996 and a recall of 0.94 on
        real sensor test sets.
      </>
    ),
    links: [
      {
        label: "Source",
        href: "https://github.com/ChinmayaBJ/h2-leak-detector",
        variant: "ember",
        icon: "github",
      },
    ],
    image: "/assets/sunnify.webp",
    alt: "H2 Leak Detector screenshot",
    objectClass: "object-top",
    body: [
      <p key="h1">
        Hydrogen leaks in industrial settings are dangerous and expensive — but
        traditional threshold-based detectors have poor recall on slow leaks and
        high false-positive rates when sensor noise spikes. The H2 Leak Detector
        replaces hard thresholds with an{" "}
        {Em("ensemble of learned models")} that understands normal sensor
        behaviour before flagging deviations.
      </p>,
      <p key="h2">
        The pipeline has two stages. An LSTM network trained on multivariate
        sensor time-series (pressure, temperature, flow rate, H2 concentration)
        predicts expected next-window readings with an R² of 0.996. Residuals
        between predicted and actual readings are then fed to an Isolation Forest,
        which distinguishes genuine anomalous patterns from sensor noise by
        isolating outliers in residual feature space rather than in raw sensor space.
      </p>,
      <p key="h3">
        On a held-out test set of real sensor recordings including both simulated
        and recorded leak events, the system achieves{" "}
        {Em("0.94 recall and 0.91 precision")} — a substantial improvement over
        the 0.73 recall of the baseline threshold approach, with only a minor
        increase in false positives. The pipeline is containerized for edge
        deployment on industrial monitoring hardware with latency under 200ms per
        inference window.
      </p>,
    ],
    highlights: [
      <>LSTM forecasting on multivariate sensor data: R² of 0.996 on test set</>,
      <>
        Isolation Forest on LSTM residuals separates genuine leak anomalies from
        sensor noise
      </>,
      <>0.94 recall vs. 0.73 for threshold baseline; 0.91 precision</>,
      <>
        Containerized for edge deployment on industrial hardware; under 200ms
        per inference window
      </>,
      <>
        Multivariate inputs: pressure, temperature, flow rate, H₂ concentration
        channels
      </>,
    ],
    builtWith: [
      "Python",
      "TensorFlow",
      "scikit-learn",
      "LSTM",
      "Isolation Forest",
      "NumPy",
      "pandas",
      "Docker",
    ],
    next: { slug: "cat-net", title: "CAT-Net" },
  },
};

export const CASE_SLUGS = Object.keys(CASE_STUDIES);
