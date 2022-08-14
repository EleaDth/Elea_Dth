import { isIdentifierStart, isIdentifierChar } from 'acorn';
import full_char_code_at from './full_char_code_at';

export const globals = new Set([
	'ANGLE_instanced_arrays',
	'ARIAMixin',
	'AbortController',
	'AbortSignal',
	'AbortSignalEventMap',
	'AbstractRange',
	'AbstractWorker',
	'AbstractWorkerEventMap',
	'ActiveXObject',
	'AddEventListenerOptions',
	'AesCbcParams',
	'AesCtrParams',
	'AesDerivedKeyParams',
	'AesGcmParams',
	'AesKeyAlgorithm',
	'AesKeyGenParams',
	'AggregateError',
	'AggregateErrorConstructor',
	'Algorithm',
	'AnalyserNode',
	'AnalyserOptions',
	'Animatable',
	'Animation',
	'AnimationEffect',
	'AnimationEvent',
	'AnimationEventInit',
	'AnimationEventMap',
	'AnimationFrameProvider',
	'AnimationPlaybackEvent',
	'AnimationPlaybackEventInit',
	'AnimationTimeline',
	'Array',
	'ArrayBuffer',
	'ArrayBufferConstructor',
	'ArrayBufferTypes',
	'ArrayBufferView',
	'ArrayConstructor',
	'ArrayLike',
	'AssignedNodesOptions',
	'AsyncGenerator',
	'AsyncGeneratorFunction',
	'AsyncGeneratorFunctionConstructor',
	'AsyncIterable',
	'AsyncIterableIterator',
	'AsyncIterator',
	'Atomics',
	'Attr',
	'Audio',
	'AudioBuffer',
	'AudioBufferOptions',
	'AudioBufferSourceNode',
	'AudioBufferSourceOptions',
	'AudioConfiguration',
	'AudioContext',
	'AudioContextOptions',
	'AudioDestinationNode',
	'AudioListener',
	'AudioNode',
	'AudioNodeOptions',
	'AudioParam',
	'AudioParamMap',
	'AudioProcessingEvent',
	'AudioProcessingEventInit',
	'AudioScheduledSourceNode',
	'AudioScheduledSourceNodeEventMap',
	'AudioTimestamp',
	'AudioWorklet',
	'AudioWorkletNode',
	'AudioWorkletNodeEventMap',
	'AudioWorkletNodeOptions',
	'AuthenticationExtensionsClientInputs',
	'AuthenticationExtensionsClientOutputs',
	'AuthenticatorAssertionResponse',
	'AuthenticatorAttestationResponse',
	'AuthenticatorResponse',
	'AuthenticatorSelectionCriteria',
	'BarProp',
	'BaseAudioContext',
	'BaseAudioContextEventMap',
	'BeforeUnloadEvent',
	'BigInt',
	'BigInt64Array',
	'BigInt64ArrayConstructor',
	'BigIntConstructor',
	'BigIntToLocaleStringOptions',
	'BigUint64Array',
	'BigUint64ArrayConstructor',
	'BiquadFilterNode',
	'BiquadFilterOptions',
	'Blob',
	'BlobCallback',
	'BlobEvent',
	'BlobEventInit',
	'BlobPropertyBag',
	'Body',
	'Boolean',
	'BooleanConstructor',
	'BroadcastChannel',
	'BroadcastChannelEventMap',
	'ByteLengthQueuingStrategy',
	'CDATASection',
	'CSS',
	'CSSAnimation',
	'CSSConditionRule',
	'CSSCounterStyleRule',
	'CSSFontFaceRule',
	'CSSGroupingRule',
	'CSSImportRule',
	'CSSKeyframeRule',
	'CSSKeyframesRule',
	'CSSMediaRule',
	'CSSNamespaceRule',
	'CSSPageRule',
	'CSSRule',
	'CSSRuleList',
	'CSSStyleDeclaration',
	'CSSStyleRule',
	'CSSStyleSheet',
	'CSSSupportsRule',
	'CSSTransition',
	'Cache',
	'CacheQueryOptions',
	'CacheStorage',
	'CallableFunction',
	'CanvasCompositing',
	'CanvasDrawImage',
	'CanvasDrawPath',
	'CanvasFillStrokeStyles',
	'CanvasFilters',
	'CanvasGradient',
	'CanvasImageData',
	'CanvasImageSmoothing',
	'CanvasPath',
	'CanvasPathDrawingStyles',
	'CanvasPattern',
	'CanvasRect',
	'CanvasRenderingContext2D',
	'CanvasRenderingContext2DSettings',
	'CanvasShadowStyles',
	'CanvasState',
	'CanvasText',
	'CanvasTextDrawingStyles',
	'CanvasTransform',
	'CanvasUserInterface',
	'ChannelMergerNode',
	'ChannelMergerOptions',
	'ChannelSplitterNode',
	'ChannelSplitterOptions',
	'CharacterData',
	'ChildNode',
	'ClassDecorator',
	'ClientQueryOptions',
	'ClientRect',
	'Clipboard',
	'ClipboardEvent',
	'ClipboardEventInit',
	'ClipboardItem',
	'ClipboardItemOptions',
	'CloseEvent',
	'CloseEventInit',
	'Collator',
	'CollatorOptions',
	'Comment',
	'CompileError',
	'CompositionEvent',
	'CompositionEventInit',
	'ComputedEffectTiming',
	'ComputedKeyframe',
	'ConcatArray',
	'Console',
	'ConstantSourceNode',
	'ConstantSourceOptions',
	'ConstrainBooleanParameters',
	'ConstrainDOMStringParameters',
	'ConstrainDoubleRange',
	'ConstrainULongRange',
	'ConvolverNode',
	'ConvolverOptions',
	'CountQueuingStrategy',
	'Credential',
	'CredentialCreationOptions',
	'CredentialPropertiesOutput',
	'CredentialRequestOptions',
	'CredentialsContainer',
	'Crypto',
	'CryptoKey',
	'CryptoKeyPair',
	'CustomElementConstructor',
	'CustomElementRegistry',
	'CustomEvent',
	'CustomEventInit',
	'DOMException',
	'DOMImplementation',
	'DOMMatrix',
	'DOMMatrix2DInit',
	'DOMMatrixInit',
	'DOMMatrixReadOnly',
	'DOMParser',
	'DOMPoint',
	'DOMPointInit',
	'DOMPointReadOnly',
	'DOMQuad',
	'DOMQuadInit',
	'DOMRect',
	'DOMRectInit',
	'DOMRectList',
	'DOMRectReadOnly',
	'DOMStringList',
	'DOMStringMap',
	'DOMTokenList',
	'DataTransfer',
	'DataTransferItem',
	'DataTransferItemList',
	'DataView',
	'DataViewConstructor',
	'Date',
	'DateConstructor',
	'DateTimeFormat',
	'DateTimeFormatOptions',
	'DateTimeFormatPart',
	'DecodeErrorCallback',
	'DecodeSuccessCallback',
	'DelayNode',
	'DelayOptions',
	'DeviceMotionEvent',
	'DeviceMotionEventAcceleration',
	'DeviceMotionEventAccelerationInit',
	'DeviceMotionEventInit',
	'DeviceMotionEventRotationRate',
	'DeviceMotionEventRotationRateInit',
	'DeviceOrientationEvent',
	'DeviceOrientationEventInit',
	'DisplayMediaStreamConstraints',
	'Document',
	'DocumentAndElementEventHandlers',
	'DocumentAndElementEventHandlersEventMap',
	'DocumentEventMap',
	'DocumentFragment',
	'DocumentOrShadowRoot',
	'DocumentTimeline',
	'DocumentTimelineOptions',
	'DocumentType',
	'DoubleRange',
	'DragEvent',
	'DragEventInit',
	'DynamicsCompressorNode',
	'DynamicsCompressorOptions',
	'EXT_blend_minmax',
	'EXT_color_buffer_float',
	'EXT_color_buffer_half_float',
	'EXT_float_blend',
	'EXT_frag_depth',
	'EXT_sRGB',
	'EXT_shader_texture_lod',
	'EXT_texture_compression_rgtc',
	'EXT_texture_filter_anisotropic',
	'EcKeyAlgorithm',
	'EcKeyGenParams',
	'EcKeyImportParams',
	'EcdhKeyDeriveParams',
	'EcdsaParams',
	'EffectTiming',
	'Element',
	'ElementCSSInlineStyle',
	'ElementContentEditable',
	'ElementCreationOptions',
	'ElementDefinitionOptions',
	'ElementEventMap',
	'Enumerator',
	'EnumeratorConstructor',
	'Error',
	'ErrorCallback',
	'ErrorConstructor',
	'ErrorEvent',
	'ErrorEventInit',
	'EvalError',
	'EvalErrorConstructor',
	'Event',
	'EventInit',
	'EventListener',
	'EventListenerObject',
	'EventListenerOptions',
	'EventModifierInit',
	'EventSource',
	'EventSourceEventMap',
	'EventSourceInit',
	'EventTarget',
	'External',
	'File',
	'FileCallback',
	'FileList',
	'FilePropertyBag',
	'FileReader',
	'FileReaderEventMap',
	'FileSystem',
	'FileSystemDirectoryEntry',
	'FileSystemDirectoryReader',
	'FileSystemEntriesCallback',
	'FileSystemEntry',
	'FileSystemEntryCallback',
	'FileSystemFileEntry',
	'FileSystemFlags',
	'FinalizationRegistry',
	'FinalizationRegistryConstructor',
	'Float32Array',
	'Float32ArrayConstructor',
	'Float64Array',
	'Float64ArrayConstructor',
	'FocusEvent',
	'FocusEventInit',
	'FocusOptions',
	'FontFace',
	'FontFaceDescriptors',
	'FontFaceSet',
	'FontFaceSetEventMap',
	'FontFaceSetLoadEvent',
	'FontFaceSetLoadEventInit',
	'FontFaceSource',
	'FormData',
	'FormDataEvent',
	'FormDataEventInit',
	'FrameRequestCallback',
	'FullscreenOptions',
	'Function',
	'FunctionConstructor',
	'FunctionStringCallback',
	'GainNode',
	'GainOptions',
	'Gamepad',
	'GamepadButton',
	'GamepadEvent',
	'GamepadEventInit',
	'GamepadHapticActuator',
	'Generator',
	'GeneratorFunction',
	'GeneratorFunctionConstructor',
	'GenericTransformStream',
	'Geolocation',
	'GeolocationCoordinates',
	'GeolocationPosition',
	'GeolocationPositionError',
	'GetAnimationsOptions',
	'GetNotificationOptions',
	'GetRootNodeOptions',
	'Global',
	'GlobalDescriptor',
	'GlobalEventHandlers',
	'GlobalEventHandlersEventMap',
	'HTMLAllCollection',
	'HTMLAnchorElement',
	'HTMLAreaElement',
	'HTMLAudioElement',
	'HTMLBRElement',
	'HTMLBaseElement',
	'HTMLBodyElement',
	'HTMLBodyElementEventMap',
	'HTMLButtonElement',
	'HTMLCanvasElement',
	'HTMLCollection',
	'HTMLCollectionBase',
	'HTMLCollectionOf',
	'HTMLDListElement',
	'HTMLDataElement',
	'HTMLDataListElement',
	'HTMLDetailsElement',
	'HTMLDialogElement',
	'HTMLDirectoryElement',
	'HTMLDivElement',
	'HTMLDocument',
	'HTMLElement',
	'HTMLElementDeprecatedTagNameMap',
	'HTMLElementEventMap',
	'HTMLElementTagNameMap',
	'HTMLEmbedElement',
	'HTMLFieldSetElement',
	'HTMLFontElement',
	'HTMLFormControlsCollection',
	'HTMLFormElement',
	'HTMLFrameElement',
	'HTMLFrameSetElement',
	'HTMLFrameSetElementEventMap',
	'HTMLHRElement',
	'HTMLHeadElement',
	'HTMLHeadingElement',
	'HTMLHtmlElement',
	'HTMLHyperlinkElementUtils',
	'HTMLIFrameElement',
	'HTMLImageElement',
	'HTMLInputElement',
	'HTMLLIElement',
	'HTMLLabelElement',
	'HTMLLegendElement',
	'HTMLLinkElement',
	'HTMLMapElement',
	'HTMLMarqueeElement',
	'HTMLMediaElement',
	'HTMLMediaElementEventMap',
	'HTMLMenuElement',
	'HTMLMetaElement',
	'HTMLMeterElement',
	'HTMLModElement',
	'HTMLOListElement',
	'HTMLObjectElement',
	'HTMLOptGroupElement',
	'HTMLOptionElement',
	'HTMLOptionsCollection',
	'HTMLOrSVGElement',
	'HTMLOutputElement',
	'HTMLParagraphElement',
	'HTMLParamElement',
	'HTMLPictureElement',
	'HTMLPreElement',
	'HTMLProgressElement',
	'HTMLQuoteElement',
	'HTMLScriptElement',
	'HTMLSelectElement',
	'HTMLSlotElement',
	'HTMLSourceElement',
	'HTMLSpanElement',
	'HTMLStyleElement',
	'HTMLTableCaptionElement',
	'HTMLTableCellElement',
	'HTMLTableColElement',
	'HTMLTableDataCellElement',
	'HTMLTableElement',
	'HTMLTableHeaderCellElement',
	'HTMLTableRowElement',
	'HTMLTableSectionElement',
	'HTMLTemplateElement',
	'HTMLTextAreaElement',
	'HTMLTimeElement',
	'HTMLTitleElement',
	'HTMLTrackElement',
	'HTMLUListElement',
	'HTMLUnknownElement',
	'HTMLVideoElement',
	'HTMLVideoElementEventMap',
	'HashChangeEvent',
	'HashChangeEventInit',
	'Headers',
	'History',
	'HkdfParams',
	'HmacImportParams',
	'HmacKeyAlgorithm',
	'HmacKeyGenParams',
	'IArguments',
	'IDBCursor',
	'IDBCursorWithValue',
	'IDBDatabase',
	'IDBDatabaseEventMap',
	'IDBDatabaseInfo',
	'IDBFactory',
	'IDBIndex',
	'IDBIndexParameters',
	'IDBKeyRange',
	'IDBObjectStore',
	'IDBObjectStoreParameters',
	'IDBOpenDBRequest',
	'IDBOpenDBRequestEventMap',
	'IDBRequest',
	'IDBRequestEventMap',
	'IDBTransaction',
	'IDBTransactionEventMap',
	'IDBVersionChangeEvent',
	'IDBVersionChangeEventInit',
	'IIRFilterNode',
	'IIRFilterOptions',
	'ITextWriter',
	'IdleDeadline',
	'IdleRequestCallback',
	'IdleRequestOptions',
	'Image',
	'ImageBitmap',
	'ImageBitmapOptions',
	'ImageBitmapRenderingContext',
	'ImageBitmapRenderingContextSettings',
	'ImageData',
	'ImageDataSettings',
	'ImportMeta',
	'Infinity',
	'InnerHTML',
	'InputEvent',
	'InputEventInit',
	'Instance',
	'Int16Array',
	'Int16ArrayConstructor',
	'Int32Array',
	'Int32ArrayConstructor',
	'Int8Array',
	'Int8ArrayConstructor',
	'InternalError',
	'IntersectionObserver',
	'IntersectionObserverCallback',
	'IntersectionObserverEntry',
	'IntersectionObserverEntryInit',
	'IntersectionObserverInit',
	'Intl',
	'Iterable',
	'IterableIterator',
	'Iterator',
	'IteratorReturnResult',
	'IteratorYieldResult',
	'JSON',
	'JsonWebKey',
	'KHR_parallel_shader_compile',
	'KeyAlgorithm',
	'KeyboardEvent',
	'KeyboardEventInit',
	'Keyframe',
	'KeyframeAnimationOptions',
	'KeyframeEffect',
	'KeyframeEffectOptions',
	'LinkError',
	'LinkStyle',
	'Location',
	'Map',
	'MapConstructor',
	'Math',
	'MathMLElement',
	'MathMLElementEventMap',
	'MediaCapabilities',
	'MediaCapabilitiesDecodingInfo',
	'MediaCapabilitiesEncodingInfo',
	'MediaCapabilitiesInfo',
	'MediaConfiguration',
	'MediaDecodingConfiguration',
	'MediaDeviceInfo',
	'MediaDevices',
	'MediaDevicesEventMap',
	'MediaElementAudioSourceNode',
	'MediaElementAudioSourceOptions',
	'MediaEncodingConfiguration',
	'MediaEncryptedEvent',
	'MediaEncryptedEventInit',
	'MediaError',
	'MediaImage',
	'MediaKeyMessageEvent',
	'MediaKeyMessageEventInit',
	'MediaKeySession',
	'MediaKeySessionEventMap',
	'MediaKeyStatusMap',
	'MediaKeySystemAccess',
	'MediaKeySystemConfiguration',
	'MediaKeySystemMediaCapability',
	'MediaKeys',
	'MediaList',
	'MediaMetadata',
	'MediaMetadataInit',
	'MediaPositionState',
	'MediaQueryList',
	'MediaQueryListEvent',
	'MediaQueryListEventInit',
	'MediaQueryListEventMap',
	'MediaRecorder',
	'MediaRecorderErrorEvent',
	'MediaRecorderErrorEventInit',
	'MediaRecorderEventMap',
	'MediaRecorderOptions',
	'MediaSession',
	'MediaSessionActionDetails',
	'MediaSessionActionHandler',
	'MediaSource',
	'MediaSourceEventMap',
	'MediaStream',
	'MediaStreamAudioDestinationNode',
	'MediaStreamAudioSourceNode',
	'MediaStreamAudioSourceOptions',
	'MediaStreamConstraints',
	'MediaStreamEventMap',
	'MediaStreamTrack',
	'MediaStreamTrackEvent',
	'MediaStreamTrackEventInit',
	'MediaStreamTrackEventMap',
	'MediaTrackCapabilities',
	'MediaTrackConstraintSet',
	'MediaTrackConstraints',
	'MediaTrackSettings',
	'MediaTrackSupportedConstraints',
	'Memory',
	'MemoryDescriptor',
	'MessageChannel',
	'MessageEvent',
	'MessageEventInit',
	'MessagePort',
	'MessagePortEventMap',
	'MethodDecorator',
	'MimeType',
	'MimeTypeArray',
	'Module',
	'ModuleExportDescriptor',
	'ModuleImportDescriptor',
	'MouseEvent',
	'MouseEventInit',
	'MultiCacheQueryOptions',
	'MutationCallback',
	'MutationEvent',
	'MutationObserver',
	'MutationObserverInit',
	'MutationRecord',
	'NaN',
	'NamedNodeMap',
	'Navigator',
	'NavigatorAutomationInformation',
	'NavigatorConcurrentHardware',
	'NavigatorContentUtils',
	'NavigatorCookies',
	'NavigatorID',
	'NavigatorLanguage',
	'NavigatorNetworkInformation',
	'NavigatorOnLine',
	'NavigatorPlugins',
	'NavigatorStorage',
	'NetworkInformation',
	'NewableFunction',
	'Node',
	'NodeFilter',
	'NodeIterator',
	'NodeList',
	'NodeListOf',
	'NonDocumentTypeChildNode',
	'NonElementParentNode',
	'Notification',
	'NotificationAction',
	'NotificationEventMap',
	'NotificationOptions',
	'NotificationPermissionCallback',
	'Number',
	'NumberConstructor',
	'NumberFormat',
	'NumberFormatOptions',
	'OES_element_index_uint',
	'OES_fbo_render_mipmap',
	'OES_standard_derivatives',
	'OES_texture_float',
	'OES_texture_float_linear',
	'OES_texture_half_float',
	'OES_texture_half_float_linear',
	'OES_vertex_array_object',
	'OVR_multiview2',
	'Object',
	'ObjectConstructor',
	'OfflineAudioCompletionEvent',
	'OfflineAudioCompletionEventInit',
	'OfflineAudioContext',
	'OfflineAudioContextEventMap',
	'OfflineAudioContextOptions',
	'OffscreenCanvas',
	'OnBeforeUnloadEventHandlerNonNull',
	'OnErrorEventHandlerNonNull',
	'Option',
	'OptionalEffectTiming',
	'OscillatorNode',
	'OscillatorOptions',
	'OverconstrainedError',
	'PageTransitionEvent',
	'PageTransitionEventInit',
	'PannerNode',
	'PannerOptions',
	'ParameterDecorator',
	'ParentNode',
	'Path2D',
	'PaymentAddress',
	'PaymentCurrencyAmount',
	'PaymentDetailsBase',
	'PaymentDetailsInit',
	'PaymentDetailsModifier',
	'PaymentDetailsUpdate',
	'PaymentItem',
	'PaymentMethodChangeEvent',
	'PaymentMethodChangeEventInit',
	'PaymentMethodData',
	'PaymentRequest',
	'PaymentRequestEventMap',
	'PaymentRequestUpdateEvent',
	'PaymentRequestUpdateEventInit',
	'PaymentResponse',
	'PaymentValidationErrors',
	'Pbkdf2Params',
	'Performance',
	'PerformanceEntry',
	'PerformanceEventMap',
	'PerformanceEventTiming',
	'PerformanceMark',
	'PerformanceMarkOptions',
	'PerformanceMeasure',
	'PerformanceMeasureOptions',
	'PerformanceNavigation',
	'PerformanceNavigationTiming',
	'PerformanceObserver',
	'PerformanceObserverCallback',
	'PerformanceObserverEntryList',
	'PerformanceObserverInit',
	'PerformancePaintTiming',
	'PerformanceResourceTiming',
	'PerformanceServerTiming',
	'PerformanceTiming',
	'PeriodicWave',
	'PeriodicWaveConstraints',
	'PeriodicWaveOptions',
	'PermissionDescriptor',
	'PermissionStatus',
	'PermissionStatusEventMap',
	'Permissions',
	'PictureInPictureWindow',
	'PictureInPictureWindowEventMap',
	'Plugin',
	'PluginArray',
	'PluralRules',
	'PluralRulesOptions',
	'PointerEvent',
	'PointerEventInit',
	'PopStateEvent',
	'PopStateEventInit',
	'PositionCallback',
	'PositionErrorCallback',
	'PositionOptions',
	'PostMessageOptions',
	'ProcessingInstruction',
	'ProgressEvent',
	'ProgressEventInit',
	'Promise',
	'PromiseConstructor',
	'PromiseConstructorLike',
	'PromiseFulfilledResult',
	'PromiseLike',
	'PromiseRejectedResult',
	'PromiseRejectionEvent',
	'PromiseRejectionEventInit',
	'PropertyDecorator',
	'PropertyDescriptor',
	'PropertyDescriptorMap',
	'PropertyIndexedKeyframes',
	'PropertyKey',
	'Proxy',
	'ProxyConstructor',
	'ProxyHandler',
	'PublicKeyCredential',
	'PublicKeyCredentialCreationOptions',
	'PublicKeyCredentialDescriptor',
	'PublicKeyCredentialEntity',
	'PublicKeyCredentialParameters',
	'PublicKeyCredentialRequestOptions',
	'PublicKeyCredentialRpEntity',
	'PublicKeyCredentialUserEntity',
	'PushManager',
	'PushSubscription',
	'PushSubscriptionJSON',
	'PushSubscriptionOptions',
	'PushSubscriptionOptionsInit',
	'QueuingStrategy',
	'QueuingStrategyInit',
	'QueuingStrategySize',
	'RTCAnswerOptions',
	'RTCCertificate',
	'RTCCertificateExpiration',
	'RTCConfiguration',
	'RTCDTMFSender',
	'RTCDTMFSenderEventMap',
	'RTCDTMFToneChangeEvent',
	'RTCDTMFToneChangeEventInit',
	'RTCDataChannel',
	'RTCDataChannelEvent',
	'RTCDataChannelEventInit',
	'RTCDataChannelEventMap',
	'RTCDataChannelInit',
	'RTCDtlsFingerprint',
	'RTCDtlsTransport',
	'RTCDtlsTransportEventMap',
	'RTCIceCandidate',
	'RTCIceCandidateInit',
	'RTCIceCandidatePairStats',
	'RTCIceServer',
	'RTCIceTransport',
	'RTCInboundRtpStreamStats',
	'RTCLocalSessionDescriptionInit',
	'RTCOfferAnswerOptions',
	'RTCOfferOptions',
	'RTCOutboundRtpStreamStats',
	'RTCPeerConnection',
	'RTCPeerConnectionErrorCallback',
	'RTCPeerConnectionEventMap',
	'RTCPeerConnectionIceErrorEvent',
	'RTCPeerConnectionIceErrorEventInit',
	'RTCPeerConnectionIceEvent',
	'RTCPeerConnectionIceEventInit',
	'RTCReceivedRtpStreamStats',
	'RTCRtcpParameters',
	'RTCRtpCapabilities',
	'RTCRtpCodecCapability',
	'RTCRtpCodecParameters',
	'RTCRtpCodingParameters',
	'RTCRtpContributingSource',
	'RTCRtpEncodingParameters',
	'RTCRtpHeaderExtensionCapability',
	'RTCRtpHeaderExtensionParameters',
	'RTCRtpParameters',
	'RTCRtpReceiveParameters',
	'RTCRtpReceiver',
	'RTCRtpSendParameters',
	'RTCRtpSender',
	'RTCRtpStreamStats',
	'RTCRtpSynchronizationSource',
	'RTCRtpTransceiver',
	'RTCRtpTransceiverInit',
	'RTCSentRtpStreamStats',
	'RTCSessionDescription',
	'RTCSessionDescriptionCallback',
	'RTCSessionDescriptionInit',
	'RTCStats',
	'RTCStatsReport',
	'RTCTrackEvent',
	'RTCTrackEventInit',
	'RTCTransportStats',
	'RadioNodeList',
	'Range',
	'RangeError',
	'RangeErrorConstructor',
	'ReadableStream',
	'ReadableStreamDefaultController',
	'ReadableStreamDefaultReadDoneResult',
	'ReadableStreamDefaultReadValueResult',
	'ReadableStreamDefaultReader',
	'ReadableStreamGenericReader',
	'ReadableWritablePair',
	'ReadonlyArray',
	'ReadonlyMap',
	'ReadonlySet',
	'ReferenceError',
	'ReferenceErrorConstructor',
	'Reflect',
	'RegExp',
	'RegExpConstructor',
	'RegExpExecArray',
	'RegExpMatchArray',
	'RegistrationOptions',
	'RelativeTimeFormat',
	'RelativeTimeFormatOptions',
	'RelativeTimeFormatPart',
	'RemotePlayback',
	'RemotePlaybackAvailabilityCallback',
	'RemotePlaybackEventMap',
	'Request',
	'RequestInit',
	'ResizeObserver',
	'ResizeObserverCallback',
	'ResizeObserverEntry',
	'ResizeObserverOptions',
	'ResizeObserverSize',
	'ResolvedCollatorOptions',
	'ResolvedDateTimeFormatOptions',
	'ResolvedNumberFormatOptions',
	'ResolvedPluralRulesOptions',
	'ResolvedRelativeTimeFormatOptions',
	'Response',
	'ResponseInit',
	'RsaHashedImportParams',
	'RsaHashedKeyAlgorithm',
	'RsaHashedKeyGenParams',
	'RsaKeyAlgorithm',
	'RsaKeyGenParams',
	'RsaOaepParams',
	'RsaOtherPrimesInfo',
	'RsaPssParams',
	'RuntimeError',
	'SVGAElement',
	'SVGAngle',
	'SVGAnimateElement',
	'SVGAnimateMotionElement',
	'SVGAnimateTransformElement',
	'SVGAnimatedAngle',
	'SVGAnimatedBoolean',
	'SVGAnimatedEnumeration',
	'SVGAnimatedInteger',
	'SVGAnimatedLength',
	'SVGAnimatedLengthList',
	'SVGAnimatedNumber',
	'SVGAnimatedNumberList',
	'SVGAnimatedPoints',
	'SVGAnimatedPreserveAspectRatio',
	'SVGAnimatedRect',
	'SVGAnimatedString',
	'SVGAnimatedTransformList',
	'SVGAnimationElement',
	'SVGBoundingBoxOptions',
	'SVGCircleElement',
	'SVGClipPathElement',
	'SVGComponentTransferFunctionElement',
	'SVGCursorElement',
	'SVGDefsElement',
	'SVGDescElement',
	'SVGElement',
	'SVGElementEventMap',
	'SVGElementTagNameMap',
	'SVGEllipseElement',
	'SVGFEBlendElement',
	'SVGFEColorMatrixElement',
	'SVGFEComponentTransferElement',
	'SVGFECompositeElement',
	'SVGFEConvolveMatrixElement',
	'SVGFEDiffuseLightingElement',
	'SVGFEDisplacementMapElement',
	'SVGFEDistantLightElement',
	'SVGFEDropShadowElement',
	'SVGFEFloodElement',
	'SVGFEFuncAElement',
	'SVGFEFuncBElement',
	'SVGFEFuncGElement',
	'SVGFEFuncRElement',
	'SVGFEGaussianBlurElement',
	'SVGFEImageElement',
	'SVGFEMergeElement',
	'SVGFEMergeNodeElement',
	'SVGFEMorphologyElement',
	'SVGFEOffsetElement',
	'SVGFEPointLightElement',
	'SVGFESpecularLightingElement',
	'SVGFESpotLightElement',
	'SVGFETileElement',
	'SVGFETurbulenceElement',
	'SVGFilterElement',
	'SVGFilterPrimitiveStandardAttributes',
	'SVGFitToViewBox',
	'SVGForeignObjectElement',
	'SVGGElement',
	'SVGGeometryElement',
	'SVGGradientElement',
	'SVGGraphicsElement',
	'SVGImageElement',
	'SVGLength',
	'SVGLengthList',
	'SVGLineElement',
	'SVGLinearGradientElement',
	'SVGMPathElement',
	'SVGMarkerElement',
	'SVGMaskElement',
	'SVGMatrix',
	'SVGMetadataElement',
	'SVGNumber',
	'SVGNumberList',
	'SVGPathElement',
	'SVGPatternElement',
	'SVGPoint',
	'SVGPointList',
	'SVGPolygonElement',
	'SVGPolylineElement',
	'SVGPreserveAspectRatio',
	'SVGRadialGradientElement',
	'SVGRect',
	'SVGRectElement',
	'SVGSVGElement',
	'SVGSVGElementEventMap',
	'SVGScriptElement',
	'SVGSetElement',
	'SVGStopElement',
	'SVGStringList',
	'SVGStyleElement',
	'SVGSwitchElement',
	'SVGSymbolElement',
	'SVGTSpanElement',
	'SVGTests',
	'SVGTextContentElement',
	'SVGTextElement',
	'SVGTextPathElement',
	'SVGTextPositioningElement',
	'SVGTitleElement',
	'SVGTransform',
	'SVGTransformList',
	'SVGURIReference',
	'SVGUnitTypes',
	'SVGUseElement',
	'SVGViewElement',
	'SafeArray',
	'Screen',
	'ScreenOrientation',
	'ScreenOrientationEventMap',
	'ScriptProcessorNode',
	'ScriptProcessorNodeEventMap',
	'ScrollIntoViewOptions',
	'ScrollOptions',
	'ScrollToOptions',
	'SecurityPolicyViolationEvent',
	'SecurityPolicyViolationEventInit',
	'Selection',
	'ServiceWorker',
	'ServiceWorkerContainer',
	'ServiceWorkerContainerEventMap',
	'ServiceWorkerEventMap',
	'ServiceWorkerRegistration',
	'ServiceWorkerRegistrationEventMap',
	'Set',
	'SetConstructor',
	'ShadowRoot',
	'ShadowRootInit',
	'ShareData',
	'SharedArrayBuffer',
	'SharedArrayBufferConstructor',
	'SharedWorker',
	'Slottable',
	'SourceBuffer',
	'SourceBufferEventMap',
	'SourceBufferList',
	'SourceBufferListEventMap',
	'SpeechRecognitionAlternative',
	'SpeechRecognitionErrorEvent',
	'SpeechRecognitionErrorEventInit',
	'SpeechRecognitionResult',
	'SpeechRecognitionResultList',
	'SpeechSynthesis',
	'SpeechSynthesisErrorEvent',
	'SpeechSynthesisErrorEventInit',
	'SpeechSynthesisEvent',
	'SpeechSynthesisEventInit',
	'SpeechSynthesisEventMap',
	'SpeechSynthesisUtterance',
	'SpeechSynthesisUtteranceEventMap',
	'SpeechSynthesisVoice',
	'StaticRange',
	'StaticRangeInit',
	'StereoPannerNode',
	'StereoPannerOptions',
	'Storage',
	'StorageEstimate',
	'StorageEvent',
	'StorageEventInit',
	'StorageManager',
	'StreamPipeOptions',
	'String',
	'StringConstructor',
	'StyleMedia',
	'StyleSheet',
	'StyleSheetList',
	'SubmitEvent',
	'SubmitEventInit',
	'SubtleCrypto',
	'Symbol',
	'SymbolConstructor',
	'SyntaxError',
	'SyntaxErrorConstructor',
	'Table',
	'TableDescriptor',
	'TemplateStringsArray',
	'Text',
	'TextDecodeOptions',
	'TextDecoder',
	'TextDecoderCommon',
	'TextDecoderOptions',
	'TextDecoderStream',
	'TextEncoder',
	'TextEncoderCommon',
	'TextEncoderEncodeIntoResult',
	'TextEncoderStream',
	'TextMetrics',
	'TextStreamBase',
	'TextStreamReader',
	'TextStreamWriter',
	'TextTrack',
	'TextTrackCue',
	'TextTrackCueEventMap',
	'TextTrackCueList',
	'TextTrackEventMap',
	'TextTrackList',
	'TextTrackListEventMap',
	'ThisType',
	'TimeRanges',
	'Touch',
	'TouchEvent',
	'TouchEventInit',
	'TouchInit',
	'TouchList',
	'TrackEvent',
	'TrackEventInit',
	'TransformStream',
	'TransformStreamDefaultController',
	'Transformer',
	'TransformerFlushCallback',
	'TransformerStartCallback',
	'TransformerTransformCallback',
	'TransitionEvent',
	'TransitionEventInit',
	'TreeWalker',
	'TypeError',
	'TypeErrorConstructor',
	'TypedPropertyDescriptor',
	'UIEvent',
	'UIEventInit',
	'ULongRange',
	'URIError',
	'URIErrorConstructor',
	'URL',
	'URLSearchParams',
	'Uint16Array',
	'Uint16ArrayConstructor',
	'Uint32Array',
	'Uint32ArrayConstructor',
	'Uint8Array',
	'Uint8ArrayConstructor',
	'Uint8ClampedArray',
	'Uint8ClampedArrayConstructor',
	'UnderlyingSink',
	'UnderlyingSinkAbortCallback',
	'UnderlyingSinkCloseCallback',
	'UnderlyingSinkStartCallback',
	'UnderlyingSinkWriteCallback',
	'UnderlyingSource',
	'UnderlyingSourceCancelCallback',
	'UnderlyingSourcePullCallback',
	'UnderlyingSourceStartCallback',
	'VBArray',
	'VBArrayConstructor',
	'VTTCue',
	'VTTRegion',
	'ValidityState',
	'VarDate',
	'VideoConfiguration',
	'VideoPlaybackQuality',
	'VisualViewport',
	'VisualViewportEventMap',
	'VoidFunction',
	'WEBGL_color_buffer_float',
	'WEBGL_compressed_texture_astc',
	'WEBGL_compressed_texture_etc',
	'WEBGL_compressed_texture_etc1',
	'WEBGL_compressed_texture_pvrtc',
	'WEBGL_compressed_texture_s3tc',
	'WEBGL_compressed_texture_s3tc_srgb',
	'WEBGL_debug_renderer_info',
	'WEBGL_debug_shaders',
	'WEBGL_depth_texture',
	'WEBGL_draw_buffers',
	'WEBGL_lose_context',
	'WSH',
	'WScript',
	'WaveShaperNode',
	'WaveShaperOptions',
	'WeakMap',
	'WeakMapConstructor',
	'WeakRef',
	'WeakRefConstructor',
	'WeakSet',
	'WeakSetConstructor',
	'WebAssembly',
	'WebAssemblyInstantiatedSource',
	'WebGL2RenderingContext',
	'WebGL2RenderingContextBase',
	'WebGL2RenderingContextOverloads',
	'WebGLActiveInfo',
	'WebGLBuffer',
	'WebGLContextAttributes',
	'WebGLContextEvent',
	'WebGLContextEventInit',
	'WebGLFramebuffer',
	'WebGLProgram',
	'WebGLQuery',
	'WebGLRenderbuffer',
	'WebGLRenderingContext',
	'WebGLRenderingContextBase',
	'WebGLRenderingContextOverloads',
	'WebGLSampler',
	'WebGLShader',
	'WebGLShaderPrecisionFormat',
	'WebGLSync',
	'WebGLTexture',
	'WebGLTransformFeedback',
	'WebGLUniformLocation',
	'WebGLVertexArrayObject',
	'WebGLVertexArrayObjectOES',
	'WebKitCSSMatrix',
	'WebSocket',
	'WebSocketEventMap',
	'WheelEvent',
	'WheelEventInit',
	'Window',
	'WindowEventHandlers',
	'WindowEventHandlersEventMap',
	'WindowEventMap',
	'WindowLocalStorage',
	'WindowOrWorkerGlobalScope',
	'WindowPostMessageOptions',
	'WindowSessionStorage',
	'Worker',
	'WorkerEventMap',
	'WorkerOptions',
	'Worklet',
	'WorkletOptions',
	'WritableStream',
	'WritableStreamDefaultController',
	'WritableStreamDefaultWriter',
	'XMLDocument',
	'XMLHttpRequest',
	'XMLHttpRequestEventMap',
	'XMLHttpRequestEventTarget',
	'XMLHttpRequestEventTargetEventMap',
	'XMLHttpRequestUpload',
	'XMLSerializer',
	'XPathEvaluator',
	'XPathEvaluatorBase',
	'XPathExpression',
	'XPathResult',
	'XSLTProcessor',
	'addEventListener',
	'alert',
	'atob',
	'blur',
	'btoa',
	'caches',
	'cancelAnimationFrame',
	'cancelIdleCallback',
	'captureEvents',
	'clearInterval',
	'clearTimeout',
	'close',
	'closed',
	'confirm',
	'console',
	'createImageBitmap',
	'crossOriginIsolated',
	'crypto',
	'customElements',
	'decodeURI',
	'decodeURIComponent',
	'devicePixelRatio',
	'dispatchEvent',
	'document',
	'encodeURI',
	'encodeURIComponent',
	'escape',
	'eval',
	'event',
	'external',
	'fetch',
	'focus',
	'frameElement',
	'frames',
	'getComputedStyle',
	'getSelection',
	'globalThis',
	'history',
	'importScripts',
	'indexedDB',
	'innerHeight',
	'innerWidth',
	'isFinite',
	'isNaN',
	'isSecureContext',
	'length',
	'localStorage',
	'location',
	'locationbar',
	'matchMedia',
	'menubar',
	'moveBy',
	'moveTo',
	'name',
	'navigator',
	'onabort',
	'onafterprint',
	'onanimationcancel',
	'onanimationend',
	'onanimationiteration',
	'onanimationstart',
	'onauxclick',
	'onbeforeprint',
	'onbeforeunload',
	'onblur',
	'oncanplay',
	'oncanplaythrough',
	'onchange',
	'onclick',
	'onclose',
	'oncontextmenu',
	'oncuechange',
	'ondblclick',
	'ondevicemotion',
	'ondeviceorientation',
	'ondrag',
	'ondragend',
	'ondragenter',
	'ondragleave',
	'ondragover',
	'ondragstart',
	'ondrop',
	'ondurationchange',
	'onemptied',
	'onended',
	'onerror',
	'onfocus',
	'onformdata',
	'ongamepadconnected',
	'ongamepaddisconnected',
	'ongotpointercapture',
	'onhashchange',
	'oninput',
	'oninvalid',
	'onkeydown',
	'onkeypress',
	'onkeyup',
	'onlanguagechange',
	'onload',
	'onloadeddata',
	'onloadedmetadata',
	'onloadstart',
	'onlostpointercapture',
	'onmessage',
	'onmessageerror',
	'onmousedown',
	'onmouseenter',
	'onmouseleave',
	'onmousemove',
	'onmouseout',
	'onmouseover',
	'onmouseup',
	'onoffline',
	'ononline',
	'onorientationchange',
	'onpagehide',
	'onpageshow',
	'onpause',
	'onplay',
	'onplaying',
	'onpointercancel',
	'onpointerdown',
	'onpointerenter',
	'onpointerleave',
	'onpointermove',
	'onpointerout',
	'onpointerover',
	'onpointerup',
	'onpopstate',
	'onprogress',
	'onratechange',
	'onrejectionhandled',
	'onreset',
	'onresize',
	'onscroll',
	'onseeked',
	'onseeking',
	'onselect',
	'onselectionchange',
	'onselectstart',
	'onstalled',
	'onstorage',
	'onsubmit',
	'onsuspend',
	'ontimeupdate',
	'ontoggle',
	'ontouchcancel',
	'ontouchend',
	'ontouchmove',
	'ontouchstart',
	'ontransitioncancel',
	'ontransitionend',
	'ontransitionrun',
	'ontransitionstart',
	'onunhandledrejection',
	'onunload',
	'onvolumechange',
	'onwaiting',
	'onwebkitanimationend',
	'onwebkitanimationiteration',
	'onwebkitanimationstart',
	'onwebkittransitionend',
	'onwheel',
	'open',
	'opener',
	'orientation',
	'origin',
	'outerHeight',
	'outerWidth',
	'pageXOffset',
	'pageYOffset',
	'parent',
	'parseFloat',
	'parseInt',
	'performance',
	'personalbar',
	'postMessage',
	'print',
	'process',
	'prompt',
	'queueMicrotask',
	'releaseEvents',
	'removeEventListener',
	'requestAnimationFrame',
	'requestIdleCallback',
	'resizeBy',
	'resizeTo',
	'screen',
	'screenLeft',
	'screenTop',
	'screenX',
	'screenY',
	'scroll',
	'scrollBy',
	'scrollTo',
	'scrollX',
	'scrollY',
	'scrollbars',
	'self',
	'sessionStorage',
	'setInterval',
	'setTimeout',
	'speechSynthesis',
	'status',
	'statusbar',
	'stop',
	'toString',
	'toolbar',
	'top',
	'undefined',
	'unescape',
	'visualViewport',
	'webkitURL',
	'window'
]);

export const reserved = new Set([
	'arguments',
	'await',
	'break',
	'case',
	'catch',
	'class',
	'const',
	'continue',
	'debugger',
	'default',
	'delete',
	'do',
	'else',
	'enum',
	'eval',
	'export',
	'extends',
	'false',
	'finally',
	'for',
	'function',
	'if',
	'implements',
	'import',
	'in',
	'instanceof',
	'interface',
	'let',
	'new',
	'null',
	'package',
	'private',
	'protected',
	'public',
	'return',
	'static',
	'super',
	'switch',
	'this',
	'throw',
	'true',
	'try',
	'typeof',
	'var',
	'void',
	'while',
	'with',
	'yield'
]);

export function is_valid(str: string): boolean {
	let i = 0;

	while (i < str.length) {
		const code = full_char_code_at(str, i);
		if (!(i === 0 ? isIdentifierStart : isIdentifierChar)(code, true)) return false;

		i += code <= 0xffff ? 1 : 2;
	}

	return true;
}

export function sanitize(name: string) {
	return name
		.replace(/[^a-zA-Z0-9_]+/g, '_')
		.replace(/^_/, '')
		.replace(/_$/, '')
		.replace(/^[0-9]/, '_$&');
}
